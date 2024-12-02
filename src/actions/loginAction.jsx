import { loginUser } from "../services/login.service.js";
import { login } from "@/store/AuthSlice.js";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    const { username, idToken } = await loginUser(email, password);
    localStorage.setItem("idToken", idToken);
    dispatch(login(username));
  } catch (error) {
    console.error("Login failed:", error);
  }
};
  