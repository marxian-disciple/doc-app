// Doctors will use this page to view their patients' medical records.
// Patients should not have access to this page.
import { useEffect } from "react";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { User, FileText, CalendarCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useMedicalRecords } from "../hooks/useMedicalRecords";

const PatientMedicalRecords = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const {
    medicalRecords,
    loading: recordsLoading,
    error,
  } = useMedicalRecords();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const patientId = searchParams.get("patientId");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (authLoading || recordsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading medical records...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;
  if (profile?.user_type !== "doctor")
    return <Navigate to="/dashboard" replace />;

  const recordsForPatient = patientId
    ? medicalRecords.filter((rec) => rec.patientId === patientId)
    : [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patient Medical Records</h1>
        <Button variant="secondary" onClick={() => navigate("/dashboard")}>
          <User className="mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {recordsForPatient.length === 0 ? (
        <p className="text-center text-gray-500">No medical records found.</p>
      ) : (
        recordsForPatient.map((record) => (
          <Card key={record.id} className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                {record.title}
              </CardTitle>
              <CardDescription className="flex items-center">
                <CalendarCheck className="mr-2" />
                {new Date(record.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{record.description}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PatientMedicalRecords;
