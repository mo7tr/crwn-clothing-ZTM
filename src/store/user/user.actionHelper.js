import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

export const authenticationHelper = async (userAuth, additionalParamaters) => {
  const userSnapshot = await createUserDocumentFromAuth(
    userAuth,
    additionalParamaters
  );

  return { id: userSnapshot.id, ...userSnapshot.data() };
};
