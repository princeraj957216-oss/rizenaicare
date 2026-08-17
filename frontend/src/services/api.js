const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function chatWithAI(message, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function analyzeSymptomsAPI(data, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/analyze-symptoms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function getMedicineInfoAPI(problem, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/medicine-information`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problem, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function getDietPlanAPI(preferences, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/diet-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ preferences, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function uploadReportAPI(formData) {
  const res = await fetch(`${API_BASE_URL}/api/analyze-report`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function uploadPrescriptionAPI(formData) {
  const res = await fetch(`${API_BASE_URL}/api/analyze-prescription`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function getDoctorsAPI() {
  const res = await fetch(`${API_BASE_URL}/api/doctors`);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function getHospitalsAPI() {
  const res = await fetch(`${API_BASE_URL}/api/hospitals`);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}
