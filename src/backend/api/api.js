const API_BASE = "http://localhost:5000/api";

// --- Appointments ---
export async function getAppointments() {
  const res = await fetch(`${API_BASE}/appointments`);
  return res.json();
}

export async function addAppointment(appointment) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  });
  return res.json();
}

// --- Medical Records ---
export async function getRecords() {
  const res = await fetch(`${API_BASE}/records`);
  return res.json();
}

export async function addRecord(formData) {
  const res = await fetch(`${API_BASE}/records`, {
    method: "POST",
    body: formData, // must be FormData with files + notes
  });
  return res.json();
}

// --- Contact Support ---
export async function contactSupport({ name, email, message }) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  return res.json();
}