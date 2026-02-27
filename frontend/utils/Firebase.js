import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // authDomain: "myauthproject-457107.firebaseapp.com",
      authDomain: "varuno.vercel.app",

    projectId: "myauthproject-457107",
    storageBucket: "myauthproject-457107.firebasestorage.app",
    messagingSenderId: "621886043444",
    appId: "1:621886043444:web:af60dbc63915551e4b2161"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { auth, provider, facebookProvider, githubProvider, microsoftProvider };
