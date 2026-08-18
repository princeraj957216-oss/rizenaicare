const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function resolveIndianPincode(value) {
  const pin = String(value || '').trim();
  if (!/^[1-9]\d{5}$/.test(pin)) return null;
  const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('PIN code lookup failed');
  const payload = await response.json();
  const offices = payload?.[0]?.Status === 'Success' ? payload[0].PostOffice : [];
  const office = offices?.[0];
  if (!office) return null;
  return {
    pin,
    locality: office.Name || office.Block || office.District,
    district: office.District,
    state: office.State,
    // Use the verified district/state as the search area. A small post-office
    // name can be ambiguous to hospital geocoders and return unrelated cities.
    label: `${office.District}, ${office.State} (${pin}), India`
  };
}

export async function searchHospitalsByLocation(location, specialization = '') {
  const cleanLocation = String(location || '').trim();
  if (!cleanLocation) return [];
  const pinMatch = cleanLocation.match(/\b([1-9]\d{5})\b/);
  const pinDetails = await resolveIndianPincode(pinMatch?.[1] || cleanLocation);
  if (pinMatch && !pinDetails) return [];
  const queryLocation = pinDetails ? `${pinDetails.district}, ${pinDetails.state}, India` : cleanLocation;
  // Restrict the geocoder to India. Without countrycodes, a numeric PIN can
  // match unrelated places anywhere in the world.
  const params = new URLSearchParams({ location: queryLocation, specialization });
  const response = await fetch(`${API_BASE_URL}/api/search-hospitals?${params}`);
  if (!response.ok) throw new Error('Location hospital search failed');
  const payload = await response.json();
  return payload.data || payload;
}

export async function chatWithAI(message, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const payload = await res.json();
  return payload.data || payload;
}

export async function analyzeSymptomsAPI(data, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/analyze-symptoms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const payload = await res.json();
  return payload.data || payload;
}

export async function getMedicineInfoAPI(problem, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/medicine-information`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problem, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const payload = await res.json();
  return payload.data || payload;
}

export async function getDietPlanAPI(preferences, language = 'en') {
  const res = await fetch(`${API_BASE_URL}/api/diet-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ preferences, language })
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const payload = await res.json();
  return payload.data || payload;
}

export async function uploadReportAPI(formData) {
  const res = await fetch(`${API_BASE_URL}/api/analyze-report`, {
    method: 'POST',
    body: formData
  });
  const payload = await res.json();
  if (!res.ok) throw new Error(payload.error || `API Error: ${res.status}`);
  return payload.data || payload;
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
