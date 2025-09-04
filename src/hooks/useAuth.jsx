// /src/hooks/useAuth.jsx
import { useEffect, useState, createContext, useContext } from "react";
import { app } from "../firebase/firebase";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          // Fetch the profile document from Firestore
          const profileRef = doc(db, "profiles", firebaseUser.uid);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            setProfile(profileSnap.data());
          } else {
            // fallback if profile doesn't exist
            setProfile({ user_type: "patient", full_name: firebaseUser.displayName || "Unknown" });
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setProfile({ user_type: "patient", full_name: firebaseUser.displayName || "Unknown" });
        }

      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
