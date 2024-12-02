import { userPool, CognitoUser, AuthenticationDetails } from "./index.service.js";

export const loginUser = (email, password) => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        const idToken = session.getIdToken().getJwtToken();
        resolve({ idToken, username: session.getIdToken().payload["cognito:username"] });
      },
      onFailure: (err) => reject(err.message || "Login failed"),
    });
  });
};
