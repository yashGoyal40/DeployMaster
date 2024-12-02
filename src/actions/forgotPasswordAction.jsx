import { forgotPasswordInitiate } from "@/services/forgotPass.service";

export const forgotPasswordInitiateAction = (email) => async (dispatch) => {
  try {
    const result = await forgotPasswordInitiate(email);
    console.log("Forgot password initiated:", result);

    dispatch({ type: "FORGOT_PASSWORD_INITIATE_SUCCESS", payload: email });
    return result;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

