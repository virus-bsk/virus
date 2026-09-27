import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  asDate,
  serverTimestamp,
  setDocument,
  subscribeDocument,
} from "../utils/firestore";
import { MAX_USER_NAME_LENGTH, userPath } from "../utils/userProfile";

function saveErrorMessage(error) {
  if (error?.code === "permission-denied") {
    return "Firestore denied the write. Publish rules that let a signed-in user write only their own users/{uid} document.";
  }
  return error?.message || "Could not save your profile. Please try again.";
}

function Profile() {
  const [user, setUser] = useState(null);
  const [profileDoc, setProfileDoc] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [nameDraft, setNameDraft] = useState(null); // null => follow the stored value
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: "success" | "error", message }
  const toastTimer = useRef(null);

  const uid = user?.id;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          name:
            currentUser.displayName || currentUser.email?.split("@")[0] || "",
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Live-read the Firestore document users/{uid} through utils/firestore.js.
  // isPaid is only ever READ here: if the client could write it, any signed-in
  // user could mark themselves as paid.
  useEffect(() => {
    if (!uid) return undefined;

    const unsubscribe = subscribeDocument(userPath(uid), (value, error) => {
      if (error) {
        setProfileError(error);
        return;
      }
      setProfileError(null);
      setProfileDoc(value);
    });

    return () => unsubscribe();
  }, [uid]);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const showToast = (type, message) => {
    setToast({ type, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const storedName =
    typeof profileDoc?.userName === "string" ? profileDoc.userName : "";
  const nameValue = nameDraft ?? (storedName || user.name || "");
  const isPaid = profileDoc?.isPaid === true;
  const memberSince = asDate(profileDoc?.date);
  const isDirty = !profileDoc || nameValue.trim() !== storedName.trim();

  const handleSave = async (event) => {
    event.preventDefault();

    const trimmed = nameValue.trim();
    if (!trimmed) {
      showToast("error", "User name cannot be empty.");
      return;
    }

    setSaving(true);

    // The first write mirrors the document created in the Firestore console
    // (userName, email, isPaid, date); later writes only touch what a client
    // owns. isPaid and date stay server-owned and are never written again.
    const payload = profileDoc
      ? { userName: trimmed, email: user.email ?? "" }
      : {
          userName: trimmed,
          email: user.email ?? "",
          isPaid: false,
          date: serverTimestamp(),
        };

    const result = await setDocument(userPath(user.id), payload, {
      merge: true,
    });
    setSaving(false);

    if (!result.ok) {
      showToast("error", saveErrorMessage(result.error));
      return;
    }

    setNameDraft(trimmed);
    showToast(
      "success",
      profileDoc ? "Profile updated." : "Profile saved to Firestore.",
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {nameValue?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <h1 className="profile-title">{nameValue || user.name}</h1>
          <p className="profile-email">{user.email}</p>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <label className="profile-form-label" htmlFor="profile-user-name">
            User Name
          </label>
          <div className="profile-form-row">
            <input
              id="profile-user-name"
              className="profile-form-input"
              type="text"
              value={nameValue}
              maxLength={MAX_USER_NAME_LENGTH}
              autoComplete="name"
              placeholder="Your display name"
              onChange={(event) => setNameDraft(event.target.value)}
              disabled={saving}
            />
            <button
              type="submit"
              className="profile-form-save"
              disabled={saving || !isDirty}
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
          <p className="profile-form-hint">
            {Math.max(0, MAX_USER_NAME_LENGTH - nameValue.length)} characters left
            · saved to <code>{userPath(user.id)}</code>
          </p>
        </form>

        <div className="profile-details">
          <div className="profile-detail-item profile-detail-primary">
            <span className="profile-detail-label">Email Address</span>
            <span className="profile-detail-value">{user.email}</span>
          </div>
          <div className="profile-detail-item">
            <span className="profile-detail-label">Display Name</span>
            <span className="profile-detail-value">
              {nameValue || user.name}
            </span>
          </div>
          <div className="profile-detail-item">
            <span className="profile-detail-label">Account Status</span>
            <span className="profile-detail-value">
              <span
                className={`profile-badge${isPaid ? " profile-badge-paid" : ""}`}
              >
                {isPaid ? "Paid" : "Free"}
              </span>
            </span>
          </div>
          <div className="profile-detail-item">
            <span className="profile-detail-label">Member Since</span>
            <span className="profile-detail-value">
              {memberSince ? memberSince.toLocaleDateString() : "—"}
            </span>
          </div>
          <div className="profile-detail-item">
            <span className="profile-detail-label">Firestore Document</span>
            <span className="profile-detail-value">
              {profileDoc ? userPath(user.id) : "Not saved yet"}
            </span>
          </div>
          {user.photoURL && (
            <div className="profile-detail-item">
              <span className="profile-detail-label">Profile Photo</span>
              <img
                src={user.photoURL}
                alt="Profile"
                className="profile-photo"
              />
            </div>
          )}
        </div>

        {profileError && (
          <p className="profile-sync profile-sync-error" role="alert">
            Could not load your Firestore profile: {profileError.message}
          </p>
        )}

        <p className="profile-note">
          Account status is read-only here — only the server can change isPaid.
        </p>

        {toast && (
          <div
            className={`profile-toast profile-toast-${toast.type}`}
            role="status"
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
