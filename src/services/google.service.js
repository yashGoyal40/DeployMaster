import { userPool ,CognitoUser,AuthenticationDetails} from "./index.service";

export const initiateGoogleLogin = async () => {
  try {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECTURI;
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&scope=openid%20email%20profile&redirect_uri=${encodeURIComponent(
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
    // Exchange the Google authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECTURI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || "Failed to exchange token");
    }

    const { id_token } = tokenData;



    const authDetails = new AuthenticationDetails({
      Username: id_token,
      Password: id_token, 
    });

    const cognitoUser = new CognitoUser({
      Username: id_token,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          const idToken = session.getIdToken().getJwtToken();
          const accessToken = session.getAccessToken().getJwtToken();

          localStorage.setItem("idToken", idToken);
          localStorage.setItem("accessToken", accessToken);

          resolve({
            email: session.idToken.payload.email,
            username: session.idToken.payload["cognito:username"],
          });
        },
        onFailure: (err) => {
          console.error("Cognito login failed:", err);
          reject(err);
        },
      });
    });
  } catch (error) {
    console.error("Google callback handling failed:", error);
    throw error;
  }
};