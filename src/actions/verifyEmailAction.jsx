import { confirmSignup } from "@/services/signup.service";
export const verifyEmailAction = (email, code) => async (dispatch) => {
  try {
    const result = await confirmSignup(email, code);
    
    console.log("Email verified:", result);

    dispatch({ type: "SET_EMAIL_VERIFIED", payload: { email } });

    return result;
  } catch (error) {
    console.error("Email verification error:", error);
    throw new Error(error.message || "Verification failed");
  }
};
