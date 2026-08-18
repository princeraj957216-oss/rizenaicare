// Medical controller for Doctors, Hospitals, and Appointments
import { sanitizeInput } from '../utils/sanitize.js';

const mockDoctorsList = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sharma',
    specialization: 'Cardiologist',
    qualification: 'MD, DM (Cardiology), FACC',
    experience: '14 years exp.',
    hospital: 'Apollo Hospital',
    area: 'Civil Lines, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 1.2,
    rating: 4.9,
    reviewsCount: 380,
    fee: '₹800',
    availableTime: 'Tomorrow 10:30 AM',
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    verified: true
  },
  {
    id: 'doc-2',
    name: 'Dr. Rakesh Verma',
    specialization: 'Cardiologist',
    qualification: 'MBBS, MS, MCh (Cardiothoracic)',
    experience: '18 years exp.',
    hospital: 'Fortis Hospital',
    area: 'Old Katra, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 3.1,
    rating: 4.8,
    reviewsCount: 420,
    fee: '₹1,000',
    availableTime: '22 May 2024 04:00 PM',
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    verified: true
  },
  {
    id: 'doc-3',
    name: 'Dr. Saurabh Singh',
    specialization: 'Cardiologist',
    qualification: 'MD (Gen Med), DNB (Cardiology)',
    experience: '11 years exp.',
    hospital: 'Narayana Hospital',
    area: 'Allahapur, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 2.4,
    rating: 4.7,
    reviewsCount: 290,
    fee: '₹750',
    availableTime: '23 May 2024 11:00 AM',
    availableDays: ['Tue', 'Thu', 'Fri', 'Sun'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    verified: true
  },
  {
    id: 'doc-4',
    name: 'Dr. Priya Mukherjee',
    specialization: 'Dermatologist',
    qualification: 'MD (Dermatology, Venereology & Leprosy)',
    experience: '9 years exp.',
    hospital: 'Skin & Laser Clinic',
    area: 'Tagore Town, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 2.1,
    rating: 4.9,
    reviewsCount: 310,
    fee: '₹600',
    availableTime: 'Today 05:30 PM',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    avatar: 'https://images.unsplash.com/photo-1594824813571-638f026361a6?auto=format&fit=crop&q=80&w=250',
    verified: true
  },
  {
    id: 'doc-5',
    name: 'Dr. Vikramaditya Roy',
    specialization: 'Neurologist',
    qualification: 'DM (Neurology), AIIMS',
    experience: '16 years exp.',
    hospital: 'Medanta Super Specialty',
    area: 'Civil Lines, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 1.8,
    rating: 4.9,
    reviewsCount: 510,
    fee: '₹1,200',
    availableTime: 'Tomorrow 02:00 PM',
    availableDays: ['Mon', 'Wed', 'Fri'],
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250',
    verified: true
  },
  {
    id: 'doc-6',
    name: 'Dr. Meenakshi Sundaram',
    specialization: 'Pediatrician',
    qualification: 'MD (Pediatrics), DCH',
    experience: '12 years exp.',
    hospital: 'Rainbow Children Clinic',
    area: 'George Town, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 2.8,
    rating: 4.8,
    reviewsCount: 340,
    fee: '₹700',
    availableTime: 'Tomorrow 11:30 AM',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    verified: true
  },
  {
    id: 'doc-7',
    name: 'Dr. Arvind Joshi',
    specialization: 'Orthopedics',
    qualification: 'MS (Ortho), Fellowship in Joint Replacement',
    experience: '15 years exp.',
    hospital: 'Max Bone & Joint Institute',
    area: 'Kareli, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 4.0,
    rating: 4.8,
    reviewsCount: 390,
    fee: '₹850',
    availableTime: '24 May 2024 10:00 AM',
    availableDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    verified: true
  }
];

const mockHospitalsList = [
  {
    id: 'hosp-1',
    name: 'Apollo Hospital',
    address: 'Civil Lines, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 1.2,
    rating: 4.6,
    reviewsCount: 1420,
    specializations: ['Cardiologist', 'Neurologist', 'General Medicine', 'Orthopedics', 'Pediatrics'],
    open24x7: true,
    emergencyPhone: '0532-2400111',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'hosp-2',
    name: 'Narayana Hospital',
    address: 'Allahapur, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 2.4,
    rating: 4.4,
    reviewsCount: 890,
    specializations: ['Cardiologist', 'Dermatologist', 'Orthopedics', 'Gastroenterology'],
    open24x7: true,
    emergencyPhone: '0532-2500222',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'hosp-3',
    name: 'Fortis Hospital',
    address: 'Old Katra, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 3.1,
    rating: 4.3,
    reviewsCount: 760,
    specializations: ['Cardiologist', 'Neurologist', 'Pediatrics', 'ENT', 'Gynecology'],
    open24x7: true,
    emergencyPhone: '0532-2600333',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'hosp-4',
    name: 'Max Super Specialty Hospital',
    address: 'George Town, Prayagraj',
    city: 'Prayagraj',
    distanceKm: 3.8,
    rating: 4.7,
    reviewsCount: 1100,
    specializations: ['Cardiologist', 'Orthopedics', 'Oncology', 'Urology', 'General Medicine'],
    open24x7: true,
    emergencyPhone: '0532-2700444',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=300'
  }
];

const locationHospitalFallbacks = {
  patna: [
    { id: 'patna-hosp-1', name: 'R.P. Golwara Memorial Hospital', address: 'Guru Govind Path, Patna, Bihar, India', city: 'Patna', specializations: ['General Physician', 'Neurologist', 'Cardiologist'], source: 'Rizen Care directory' },
    { id: 'patna-hosp-2', name: 'Arvind Hospital', address: 'Khazanchi Road, Patna, Bihar, India', city: 'Patna', specializations: ['General Physician', 'Dermatologist', 'Pediatrician'], source: 'Rizen Care directory' },
    { id: 'patna-hosp-3', name: 'Government Hospital', address: 'Dhanpura, Patna, Bihar, India', city: 'Patna', specializations: ['General Physician', 'Orthopedics', 'Gynecologist'], source: 'Rizen Care directory' }
  ]
};

let appointmentsDatabase = [];

export class MedicalController {
  static async searchHospitals(req, res) {
    const location = String(req.query.location || '').trim();
    const specialization = String(req.query.specialization || '').trim();
    if (!location) return res.json({ success: true, data: [] });

    const query = [specialization, 'hospital', location, 'India'].filter(Boolean).join(', ');
    const params = new URLSearchParams({ format: 'jsonv2', q: query, limit: '8', addressdetails: '1', countrycodes: 'in' });
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'RizenCare/1.0 (healthcare-demo)'
      }
    });
    if (!response.ok) throw new Error(`Hospital search provider returned ${response.status}`);
    const places = await response.json();
    let hospitals = places.filter((place) => place.address?.country_code?.toLowerCase() === 'in').map((place, index) => ({
      id: `osm-${place.place_id || index}`,
      name: place.display_name?.split(',')[0] || 'Medical facility',
      address: place.display_name || location,
      city: place.address?.city || place.address?.town || place.address?.state || location,
      distanceKm: null,
      rating: null,
      specializations: specialization ? [specialization] : [],
      open24x7: false,
      emergencyPhone: '',
      image: null,
      source: 'OpenStreetMap'
    }));
    if (!hospitals.length) {
      const key = Object.keys(locationHospitalFallbacks).find((city) => location.toLowerCase().includes(city));
      hospitals = (locationHospitalFallbacks[key] || []).filter((hospital) => !specialization || hospital.specializations.some((item) => item.toLowerCase().includes(specialization.toLowerCase()) || specialization.toLowerCase().includes(item.toLowerCase())));
    }
    res.json({ success: true, data: hospitals, count: hospitals.length });
  }

  static getDoctors(req, res) {
    const { specialization, location, city } = req.query;
    let filtered = [...mockDoctorsList];

    if (specialization && specialization !== 'All') {
      const specLower = specialization.toLowerCase();
      filtered = filtered.filter(d => 
        d.specialization.toLowerCase().includes(specLower) ||
        specLower.includes(d.specialization.toLowerCase())
      );
    }

    if (city && city !== 'All') {
      filtered = filtered.filter(d => d.city.toLowerCase() === city.toLowerCase());
    }

    res.json({
      success: true,
      data: filtered,
      count: filtered.length
    });
  }

  static getHospitals(req, res) {
    const { specialization, location, city } = req.query;
    let filtered = [...mockHospitalsList];

    if (specialization && specialization !== 'All') {
      const specLower = specialization.toLowerCase();
      filtered = filtered.filter(h =>
        h.specializations.some(s => s.toLowerCase().includes(specLower) || specLower.includes(s.toLowerCase()))
      );
    }

    if (city && city !== 'All') {
      filtered = filtered.filter(h => h.city.toLowerCase() === city.toLowerCase());
    }

    res.json({
      success: true,
      data: filtered,
      count: filtered.length
    });
  }

  static createAppointment(req, res) {
    const data = sanitizeInput(req.body);
    const newAppointment = {
      id: 'apt-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...data,
      status: 'CONFIRMED'
    };
    appointmentsDatabase.push(newAppointment);

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      data: newAppointment
    });
  }

  static getAppointments(req, res) {
    res.json({
      success: true,
      data: appointmentsDatabase
    });
  }
}
