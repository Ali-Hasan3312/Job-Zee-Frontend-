import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUisxnfuStt9kyY8F1V5ezW6y0qQAsD7Y",
  authDomain: "jobzee-fbda2.firebaseapp.com",
  projectId: "jobzee-fbda",
  storageBucket: "jobzee-fbda2.appspot.com",
  messagingSenderId: "908606109066",
  appId: "1:908606109066:web:17536bd38e2eb51b4e4473",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);