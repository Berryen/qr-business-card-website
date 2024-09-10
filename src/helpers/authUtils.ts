// Function to check if a user is authenticated (checks if token exists)
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists, false otherwise
};

// Function to retrieve the authentication token from localStorage (or cookies if needed)
export const getAuthToken = (): string | null => {
  return localStorage.getItem("token"); // or retrieve from cookies
};

// Function to retrieve the authenticated id from the token
export const getAuthenticatedUser = (): string | null => {
  const token = getAuthToken();

  if (!token) return null;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    // Return the `id` from the token instead of `username`
    return decodedToken.id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Function to clear the authentication token (logout)
export const clearAuthToken = (): void => {
  localStorage.removeItem("token"); // Clear token from localStorage
  // If using cookies:
  // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
