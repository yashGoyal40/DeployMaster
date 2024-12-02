import { userPool } from "./index.service";

export const checkLoggedIn = () => {
  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();

    if (!currentUser) {
      resolve(null);
      return;
    }

    currentUser.getSession((err, session) => {
      if (err || !session.isValid()) {
        resolve(null); 
      } else {
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err); 
          } else {
            const username = attributes.find((attr) => attr.Name === "email").Value;
            resolve(username); 
          }
        });
      }
    });
  });
};
