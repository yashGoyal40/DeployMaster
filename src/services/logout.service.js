import { userPool } from "./index.service.js";

export const logoutUser = () => {
  const cognitoUser = userPool.getCurrentUser();
  return new Promise((resolve, reject) => {
    if (cognitoUser) {
      cognitoUser.signOut(() => resolve("Logged out successfully"));
    } else {
      reject("No user to log out");
    }
  });
};
