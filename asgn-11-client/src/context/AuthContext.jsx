


import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import Cookies from "js-cookie";  // Ensure Cookies library is imported
import app from "../firebase/firebase.init";

const auth = getAuth(app);

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          Cookies.set("token", token, { path: "/", secure: true });  // Set secure cookie
          setUser(currentUser);
        } catch (error) {
          console.error("Error retrieving token:", error);
        }
      } else {
        Cookies.remove("token", { path: "/" });
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      Cookies.set("token", idToken, { path: "/", secure: true });
      setUser(result.user);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      Cookies.remove("token", { path: "/" });
      setUser(null);
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleLogin, signOutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { app };
export default AuthContext;