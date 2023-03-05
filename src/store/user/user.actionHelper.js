import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

export const authenticationHelper = async (userAuth) => {
  const userSnapshot = await createUserDocumentFromAuth(userAuth);
  console.log("userSnapshot.data() =>", userSnapshot.data());

  return { id: userSnapshot.id, ...userSnapshot.data() };
};
