import { userPool } from "./index.service.js";

export const signupUser = (email,name, password) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(email,name, password, [], null, (err, result) => {
      if (err) {
        reject(err.message || "Signup failed");
        console.log(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

export const confirmSignup = (email, code) => {
  const cognitoUser = userPool.getCurrentUser();
  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err) => {
      if (err) {
        reject(err.message || "Verification failed");
      } else {
        resolve("Signup confirmed");
      }
    });
  });
};
