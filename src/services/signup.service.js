import { userPool } from "./index.service.js";

export const signupUser = (email, name, password) => {
  const attributeList = [
    {
      Name: "email",
      Value: email,
    },
    {
      Name: "name",
      Value: name,
    },
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.error(err.message);
        reject(err.message || "Signup failed");
      } else {
        resolve(result);
      }
    });
  });
};
