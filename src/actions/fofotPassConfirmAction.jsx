import { forgotPasswordConfirm } from "@/services/forgotPass.service";

export const forgotPasswordConfirmAction = (email, code, newPassword) => async (dispatch) => {
  try {
    const result = await forgotPasswordConfirm(email, code, newPassword);
    console.log("Password reset success:", result);

    dispatch({ type: "FORGOT_PASSWORD_CONFIRM_SUCCESS", payload: email });
    return result;
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
};
