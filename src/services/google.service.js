const initiateGoogleLogin = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const scope = "openid email profile"; // Adjust scopes as necessary
  const responseType = "code";
  const state = Math.random().toString(36).substr(2); // Optional: Used for security purposes
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=${responseType}&scope=${encodeURIComponent(
    scope
  )}&state=${state}`;

  // Redirect the user to Google's OAuth 2.0 authorization page
  window.location.href = googleAuthUrl;
};

export {initiateGoogleLogin}