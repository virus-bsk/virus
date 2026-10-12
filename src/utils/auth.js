// Simple client-side auth helper for session handling and logout.
// firebaseAuth (and the whole Firebase SDK behind it) is imported lazily inside
// logout() so this module can be pulled into the startup bundle (NavBar,
// RequireAuth) without dragging Firebase along with it.

const CURRENT_KEY = "bsk_current_user";

export async function logout() {
  try {
    const { logout: firebaseLogout } = await import("../utils/firebaseAuth");
    await firebaseLogout();
  } catch {
    // ignore firebase signout errors and continue clearing local session
  }
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

export default {
  logout,
  getCurrentUser,
  isAuthenticated,
};
