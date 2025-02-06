





import React, { createContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../firebase/firebase.init'; // Adjust the import path if necessary
import Cookies from 'js-cookie';
import AuthContext from './AuthContext';
// Create AuthContext


// Initialize Firestore
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Set token in localStorage and cookies
  const setToken = (token) => {
    localStorage.setItem('token', token);
    Cookies.set('token', token, { expires: 1 });
  };

  // Clear token from localStorage and cookies
  const clearToken = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
  };

  // Create user with email and password
  const createUser = async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      setUser(userCredential.user);

      // Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email: userCredential.user.email,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error creating user:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in user with email and password
  const signInUser = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in user:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      setToken(idToken);
      setUser(result.user);

      // Save or update user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        lastLoginAt: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out user
  const signOutUser = async () => {
    setLoading(true);
    setError('');
    try {
      await signOut(auth);
      clearToken();
      setUser(null);
    } catch (error) {
      console.error('Error signing out user:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Validate the token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(false);
    }

    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
        setUser(currentUser);
      } else {
        clearToken();
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    error,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



