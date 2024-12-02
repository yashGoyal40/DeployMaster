import { signupUser } from "@/services/signup.service"; 

export const signupAction = (name, email, password) => async (dispatch) => {
  try {
    const result = await signupUser(email, name,password);

    console.log("Signup result:", result);

    dispatch({ type: "SET_SIGNUP_SUCCESS", payload: { email } });

    return result;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(error.message || "Signup failed");
  }
};
