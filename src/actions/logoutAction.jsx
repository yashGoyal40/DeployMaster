import { logoutUser } from "../services/logout.service.js";
import { logout } from "@/store/AuthSlice.js";

export const logoutAction = () => async (dispatch) => {
  try {
    await logoutUser();
    localStorage.removeItem("idToken");
    dispatch(logout());
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
