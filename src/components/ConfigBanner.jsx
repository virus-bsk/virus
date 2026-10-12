import { useEffect, useState } from "react";

export default function ConfigBanner() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const checkConfig = async () => {
      try {
        // firebaseAuth pulls in the whole Firebase SDK; load it lazily so the
        // banner (rendered on every page) never blocks the startup bundle.
        const { validateFirebaseConfig } = await import(
          "../utils/firebaseAuth"
        );
        if (cancelled) return;
        const res = validateFirebaseConfig();
        setInfo(res);
      } catch (err) {
        if (cancelled) return;
        setInfo({ ok: false, error: err.message || String(err) });
      }
    };
    checkConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!info) return null;
  if (info.ok) return null;

  const missing = info.missing
    ? `Missing fields: ${info.missing.join(", ")}`
    : info.error || "Configuration invalid";

  return (
    <div
      style={{
        background: "#ffefef",
        color: "#5a0000",
        padding: "8px 12px",
        textAlign: "center",
      }}
    >
      <strong>Firebase config warning:</strong> {missing}.<br />
      Ensure `src/firebase.js` matches your Firebase Project settings and enable
      Email/Password in Authentication.
    </div>
  );
}
