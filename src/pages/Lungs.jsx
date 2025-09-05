// src/pages/LungsAndBreathing.tsx
import { useEffect, useState } from "react";
import {
  Wind,
  Activity,
  FileText,
  Search,
  Phone,
  Mail,
  Clock,
  Stethoscope,
} from "lucide-react";
import {
  getAppointments,
  addAppointment,
  getRecords,
  addRecord,
  contactSupport,
} from "@/backend/api/api";
import {Link }  from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ✅ Custom Lungs Icon (since lucide-react has no 'Lungs')
const LungsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-cyan-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2v20M12 12c-2 0-3.5-2-3.5-4.5V4.5M12 12c2 0 3.5-2 3.5-4.5V4.5M8.5 7L5 10.5v4c0 3 2 6 7 7M15.5 7L19 10.5v4c0 3-2 6-7 7"
    />
  </svg>
);

export default function LungsAndBreathing() {
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAppointments().then(setAppointments);
    getRecords().then(setRecords);
  }, []);

  const handleNewAppointment = async () => {
    const newApp = {
      fullname: "Alice M.",
      email: "alice@example.com",
      date: "2025-09-15",
      time: "09:00",
      reason: "Sleep Apnea Consultation",
    };
    const saved = await addAppointment(newApp);
    setAppointments([...appointments, saved]);
  };

  const handleNewRecord = async () => {
    const record = { notes: "X-ray report - clear" };
    const saved = await addRecord(record);
    setRecords([...records, saved.files]);
  };

  const handleContact = async () => {
    const res = await contactSupport({
      name: "Alice",
      email: "alice@example.com",
      message: "I need help with my breathing treatment.",
    });
    setMessage(res.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-cyan-100 py-12 px-6">
        <Link to="/" className="inline-flex items-center mb-6 text-teal-600 hover:text-teal-800 transition-colors">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
        </Link>   
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-cyan-800 mb-3 flex justify-center items-center gap-3">
          <LungsIcon />
          Lungs & Breathing Health
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Connect with respiratory specialists, manage breathing-related medical
          records, and receive quality care digitally.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-2xl shadow-md text-center">
            <Stethoscope className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Consult Specialists</h3>
            <p>Book online appointments with pulmonologists and lung care experts.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md text-center">
            <FileText className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Medical Records</h3>
            <p>Upload test results, prescriptions, and x-rays securely.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md text-center">
            <Wind className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Breathing Support</h3>
            <p>Access resources for asthma, COPD, sleep apnea, and more.</p>
          </div>
        </div>

        {/* Dynamic Data (Appointments + Records) */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Appointments */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Clock className="text-cyan-600" /> Appointments
            </h3>
            <ul className="space-y-2">
              {appointments.map((a, i) => (
                <li key={i} className="border p-2 rounded-lg">
                  {a.fullname} – {a.date} at {a.time} ({a.reason})
                </li>
              ))}
            </ul>
            <button
              onClick={handleNewAppointment}
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700"
            >
              Book Test Appointment
            </button>
          </div>

          {/* Records */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FileText className="text-cyan-600" /> Medical Records
            </h3>
            <ul className="space-y-2">
              {records.map((r, i) => (
                <li key={i} className="border p-2 rounded-lg">
                  {typeof r === "string" ? r : JSON.stringify(r)}
                </li>
              ))}
            </ul>
            <button
              onClick={handleNewRecord}
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700"
            >
              Upload Test Record
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-12">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Search className="text-cyan-600" /> FAQ: Common Respiratory Issues
          </h3>
          <ul className="space-y-3">
            <li>
              <strong>Asthma:</strong> Learn how to track triggers and manage
              inhaler use digitally.
            </li>
            <li>
              <strong>COPD:</strong> Access lifestyle guidance and
              remote-monitoring options.
            </li>
            <li>
              <strong>Sleep Apnea:</strong> Book a consultation for sleep study
              results and treatment.
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="font-bold text-xl mb-4 flex items-center justify-center gap-2">
            <Phone className="text-cyan-600" /> Contact Support
          </h3>
          <p className="text-gray-600 mb-4">
            Need help? Reach out to our support team anytime.
          </p>
          <button
            onClick={handleContact}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700"
          >
            Send Support Message
          </button>
          {message && <p className="mt-3 text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}