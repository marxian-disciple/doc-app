// src/hooks/usePatients.js
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "./useAuth";

export const usePatients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchPatients = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Fetch all appointments where doctorId matches logged-in doctor
        const appointmentsRef = collection(db, "appointments");
        const q = query(appointmentsRef, where("doctorId", "==", user.uid));
        const appointmentSnap = await getDocs(q);

        if (appointmentSnap.empty) {
          setPatients([]);
          return;
        }

        // 2️⃣ Get unique patient IDs
        const patientIds = [
          ...new Set(appointmentSnap.docs.map((doc) => doc.data().patientId))
        ];

        // 3️⃣ Fetch patient user documents in parallel
        const patientsData = await Promise.all(
          patientIds.map(async (id) => {
            const userSnap = await getDoc(doc(db, "users", id));
            return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } : null;
          })
        );

        // 4️⃣ Filter out any nulls and set state
        setPatients(patientsData.filter(Boolean));
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [user]);

  return { patients, loading, error };
};
