import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { ArrowLeft, MapPin, Search } from 'lucide-react';

// Reusable Autocomplete Component
const LocationAutocomplete = ({ id, label, placeholder, value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query && query !== value && query.length > 2) {
        searchLocation(query);
      }
    }, 500); // debounce API calls
    return () => clearTimeout(timer);
  }, [query]);

  const searchLocation = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&state=Gujarat&country=India&format=json&limit=5`
      );
      const data = await response.json();
      setResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result) => {
    const displayName = result.display_name.split(',')[0] + ', ' + (result.display_name.split(',')[1] || '').trim();
    setQuery(displayName);
    onChange({ 
      target: { 
        id, 
        value: displayName, 
        lat: result.lat, 
        lon: result.lon,
        name: result.display_name.split(',')[0]
      } 
    });
    setShowDropdown(false);
  };

  return (
    <div className="mb-4 relative" ref={wrapperRef}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className="input-field pl-10"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e); // keep parent synced with raw text if they don't select
          }}
          onFocus={() => { if(results.length > 0) setShowDropdown(true); }}
          autoComplete="off"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        {loading && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>}
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {results.map((result, idx) => (
            <li 
              key={idx}
              className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 flex items-start gap-2"
              onClick={() => handleSelect(result)}
            >
              <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
              <div>
                 <p className="font-medium text-slate-800 text-sm">{result.display_name.split(',')[0]}</p>
                 <p className="text-xs text-slate-500 line-clamp-1">{result.display_name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const NewRequest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '', origin_lat: null, origin_lng: null, origin_name: '',
    destination: '', dest_lat: null, dest_lng: null, dest_name: '',
    date: '', timeStart: '', seats: 1, budget: ''
  });

  const handleChange = (e) => {
    // Check if the event came from autocomplete with lat/lon
    if (e.target.lat) {
      setFormData({ 
        ...formData, 
        [e.target.id]: e.target.value,
        [`${e.target.id}_lat`]: e.target.lat,
        [`${e.target.id}_lng`]: e.target.lon,
        [`${e.target.id}_name`]: e.target.name
      });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => step > 1 ? setStep(step - 1) : navigate(-1);
  
  const handleSubmit = () => {
    // In real app, submit to /api/travel_requests
    alert("Request Created! Looking for matches.");
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-1 mb-8">
        <button onClick={handleBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">New Ride Request</h2>
      </div>

      <div className="flex gap-2 mb-8 px-1">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${s <= step ? 'bg-primary-500' : 'bg-slate-200'}`}></div>
        ))}
      </div>

      <Card className="min-h-[400px] flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-5 py-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Where are you heading?</h3>
            <LocationAutocomplete 
              id="origin" 
              label="From (Village/City in Gujarat)" 
              placeholder="e.g. Sanand" 
              value={formData.origin} 
              onChange={handleChange} 
            />
            <LocationAutocomplete 
              id="destination" 
              label="To" 
              placeholder="e.g. Ahmedabad" 
              value={formData.destination} 
              onChange={handleChange} 
            />
            <Button onClick={handleNext} className="mt-8" disabled={!formData.origin || !formData.destination}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 py-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold mb-6 text-slate-800">When do you want to travel?</h3>
            <Input id="date" type="date" label="Date" value={formData.date} onChange={handleChange} />
            
            <div className="p-5 bg-primary-50 rounded-xl border border-primary-100 mt-4 mb-2">
              <p className="text-sm font-medium text-primary-800 mb-4">Select your preferred departure block. Being flexible helps find cheaper rides!</p>
              <select 
                id="timeStart" 
                value={formData.timeStart} 
                onChange={handleChange}
                className="w-full bg-white border border-primary-200 text-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">Select Time Window</option>
                <option value="morning">Morning (6 AM - 10 AM)</option>
                <option value="midday">Mid-day (10 AM - 2 PM)</option>
                <option value="afternoon">Afternoon (2 PM - 6 PM)</option>
              </select>
            </div>
            
            <Button onClick={handleNext} className="mt-8" disabled={!formData.date || !formData.timeStart}>
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 py-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Seats & Budget</h3>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-3">How many seats needed?</label>
              <div className="flex items-center gap-4 border border-slate-200 p-2 rounded-xl bg-slate-50 w-max">
                <button 
                  onClick={() => setFormData({...formData, seats: Math.max(1, formData.seats - 1)})}
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-2xl text-slate-600 hover:bg-slate-50"
                  type="button"
                >-</button>
                <span className="w-10 text-center font-bold text-xl">{formData.seats}</span>
                <button 
                  onClick={() => setFormData({...formData, seats: formData.seats + 1})}
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-2xl text-primary-600 hover:bg-slate-50"
                  type="button"
                >+</button>
              </div>
            </div>

            <Input 
              id="budget" 
              type="number" 
              label="Max Budget per seat (₹)" 
              placeholder="e.g. 80" 
              value={formData.budget} 
              onChange={handleChange} 
            />
            
            <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 flex items-start gap-3 mt-8">
              <MapPin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <p>Your request will be grouped with others traveling from {formData.origin || 'your area'} to {formData.destination || 'your destination'} to save costs!</p>
            </div>

            <Button onClick={handleSubmit} className="mt-8" disabled={!formData.budget}>
              Submit Request
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NewRequest;
