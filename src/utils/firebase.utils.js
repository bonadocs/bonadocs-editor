import { initializeApp, signInWithRedirect } from "@firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
    GithubAuthProvider,
  onAuthStateChanged,
} from "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBTpv1JcZvTNiiEJu488bAdA7P7KXifGa4",
  authDomain: "bonadocs-cebc1.firebaseapp.com",
  projectId: "bonadocs-cebc1",
  storageBucket: "bonadocs-cebc1.appspot.com",
  messagingSenderId: "559642403323",
  appId: "1:559642403323:web:0a219c3b3494eb617f6b5e",
  measurementId: "G-SWB8JNV42Q",
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});

gitProvider.addScope('repo');
gitProvider.setCustomParameters({
  'allow_signup': 'false'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGithubPopup = () => signInWithPopup(auth, gitProvider);