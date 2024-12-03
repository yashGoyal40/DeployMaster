import { userPool } from "./index.service";

export const initiateGoogleLogin = async () => {
  try {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/google-callback`; // Your redirect URI
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&scope=email%20profile&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=google_login`;

    window.location.href = loginUrl;
  } catch (error) {
    console.error("Google Login initiation failed:", error);
    throw error;
  }
};

export const handleGoogleCallback = async (code) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/oauth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const { idToken, email, username, googleId } = data;

      localStorage.setItem("idToken", idToken);

      return { email, username, googleId };
    } else {
      throw new Error(data.error || "Failed to process Google login");
    }
  } catch (error) {
    console.error("Google callback handling failed:", error);
    throw error;
  }
};
