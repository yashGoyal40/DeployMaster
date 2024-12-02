import { CognitoUser ,userPool} from "./index.service.js";

export const confirmSignup = (email, code) => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err) => {
      if (err) {
        console.error(err.message);
        reject(err.message || "Verification failed");
      } else {
        resolve("Signup confirmed");
      }
    });
  });
};
