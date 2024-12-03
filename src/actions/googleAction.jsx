import { initiateGoogleLogin, handleGoogleCallback } from "@/services/google.service.js";
import { googleLogin } from "@/store/AuthSlice.js";

export const googleLoginAction = () => async (dispatch) => {
  try {
    await initiateGoogleLogin();
  } catch (error) {
    console.error("Google login action failed:", error);
  }
};

export const googleCallbackAction = (code) => async (dispatch) => {
  try {
    const { email, username, googleId } = await handleGoogleCallback(code);
    console.log({email,username,googleId})
    dispatch(
      googleLogin({
        email,
        username,
        googleId,
      })
    );
  } catch (error) {
    console.error("Google callback action failed:", error);
  }
};
