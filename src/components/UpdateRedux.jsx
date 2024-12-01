import React from "react";
import { getCurrentUser } from "@aws-amplify/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/AuthSlice";
import { useEffect } from "react";
function UpdateStore() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { signInDetails } = await getCurrentUser();
        dispatch(login(signInDetails.loginId));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return <></>;
}

export default UpdateStore;
