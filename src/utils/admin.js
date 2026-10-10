// Single source of truth for admin access.
// Only this account can open the hidden admin route. The route itself is
// unlinked (no NavBar entry), so nobody else can discover it from the UI,
// and RequireAdmin + Firestore rules both enforce the same email.
export const ADMIN_EMAIL = "bharathbsk97@gmail.com";

// Lowercased email prefix (document id) of the admin, for convenience.
export const ADMIN_PREFIX = "bharathbsk97";

export function isAdminEmail(email) {
  if (typeof email !== "string") return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL;
}

export function isAdminUser(user) {
  const email =
    typeof user === "string" ? user : user?.email ?? user?.mail ?? "";
  return isAdminEmail(email);
}

export default { ADMIN_EMAIL, ADMIN_PREFIX, isAdminEmail, isAdminUser };
