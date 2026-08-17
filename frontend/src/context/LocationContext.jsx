import React, { createContext, useContext, useState, useEffect } from 'react';

export const specializationsList = [
  'Cardiologist',
  'General Physician',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedics',
  'Gynecologist',
  'ENT Specialist',
  'Ophthalmologist',
  'Dentist',
  'Psychiatrist',
  'Gastroenterologist',
  'Pulmonologist',
  'Urologist',
  'Endocrinologist',
  'Oncologist'
];

export const popularCitiesList = [
  'Prayagraj, Uttar Pradesh',
  'Lucknow, Uttar Pradesh',
  'Varanasi, Uttar Pradesh',
  'New Delhi, Delhi',
  'Mumbai, Maharashtra',
  'Bengaluru, Karnataka',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Chennai, Tamil Nadu',
  'Pune, Maharashtra',
  'Jaipur, Rajasthan',
  'Ahmedabad, Gujarat',
  'Chandigarh, Punjab',
  'Bhopal, Madhya Pradesh',
  'Patna, Bihar',
  'Indore, Madhya Pradesh'
];

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocationState] = useState(() => {
    return localStorage.getItem('rizen_location') || 'Prayagraj, Uttar Pradesh';
  });

  const [specialization, setSpecializationState] = useState(() => {
    return localStorage.getItem('rizen_specialization') || 'Cardiologist';
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const setLocation = (newLoc) => {
    if (!newLoc || !newLoc.trim()) return;
    const clean = newLoc.trim();
    setLocationState(clean);
    localStorage.setItem('rizen_location', clean);
  };

  const setSpecialization = (newSpec) => {
    if (!newSpec) return;
    setSpecializationState(newSpec);
    localStorage.setItem('rizen_specialization', newSpec);
  };

  const detectLocation = (onSuccess = null) => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported in this browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          
          let resolvedLocation = `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E (Live GPS)`;
          
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.suburb || data.address.county || data.address.state_district || 'Detected Area';
              const state = data.address.state || data.address.country || '';
              resolvedLocation = `${city}${state ? ', ' + state : ''}`;
            }
          } catch (fetchErr) {
            // If reverse geocode times out or is blocked, use live GPS tag
            resolvedLocation = `Live Location (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;
          }

          setLocation(resolvedLocation);
          if (onSuccess) onSuccess(resolvedLocation);
        } catch (e) {
          setLocation('Current Location (GPS Active)');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        let msg = 'Unable to fetch GPS. You can type your city or PIN code manually.';
        if (err.code === 1) msg = 'Location permission was denied. Please enter your city or PIN code.';
        setLocationError(msg);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const lookupPinCode = async (pin) => {
    const cleanPin = pin.trim().replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setLocation(`PIN ${cleanPin}, India`);
      return `PIN ${cleanPin}, India`;
    }

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`);
      const data = await res.json();
      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice[0]) {
        const po = data[0].PostOffice[0];
        const resolved = `${po.District || po.Name}, ${po.State} (${cleanPin})`;
        setLocation(resolved);
        return resolved;
      }
    } catch (e) {
      // Fallback
    }

    const fallback = `PIN ${cleanPin}, India`;
    setLocation(fallback);
    return fallback;
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        specialization,
        setSpecialization,
        detectLocation,
        lookupPinCode,
        isLocating,
        locationError,
        specializationsList,
        popularCitiesList
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => useContext(LocationContext);
