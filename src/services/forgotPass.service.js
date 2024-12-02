import { CognitoUser, userPool } from "./index.service.js";

export const forgotPasswordInitiate = (email) => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (data) => resolve(data),
      onFailure: (err) => reject(err.message || "Failed to initiate password reset"),
    });
  });
};

export const forgotPasswordConfirm = (email, code, newPassword) => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => resolve("Password reset successfully"),
      onFailure: (err) => reject(err.message || "Failed to reset password"),
    });
  });
};
