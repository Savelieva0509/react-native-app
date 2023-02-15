import db from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, nickname }) =>
      async (dispatch, getState) => {
      console.log(email, password, nickname);
    try {
      const user = await db.auth().createUserWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message");
    }
  };

export const authSignInUser = () => async (dispatch, getState) => {};
export const authSignOutUser = () => async (dispatch, getState) => {};
