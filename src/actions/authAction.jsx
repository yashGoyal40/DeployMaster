import { checkLoggedIn } from '@/services/checkedLoggedIn.service';
import { login } from "@/store/AuthSlice";

export const checkLoggedInAction = () => async (dispatch) => {
  try {
    const username = await checkLoggedIn();
    if (username) {
      dispatch(login(username)); 
    }
  } catch (error) {
    console.error("Error checking logged-in session:", error);
  }
};
