import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import useAuth from "@/hooks/use-auth";

export default function useSocialLogin() {
  const { signInWithSocial } = useAuth();

  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // @ts-ignore
      const token = result._tokenResponse.idToken;

      signInWithSocial(token);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);

      // @ts-ignore
      const token = result._tokenResponse.idToken;

      signInWithSocial(token);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loginWithGoogle,
    loginWithFacebook,
  };
}
