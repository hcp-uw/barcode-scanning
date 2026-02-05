import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "allerive-auth",
  appId: "REPLACE_ME",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);