import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Plus, Minus } from 'lucide-react';
import './SearchForm.css';

const CITIES = [
  'Hyderabad', 'Dubai', 'London', 'USA', 'Telangana', 'Paris', 'Tokyo'
];

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  
  const passengerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passengerRef.current && !passengerRef.current.contains(event.target)) {
        setIsPassengersOpen(false);
      }
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setFromSuggestions([]);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setToSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (value.length > 0) {
      const filtered = CITIES.filter(city => 
        city.toLowerCase().includes(value.toLowerCase()) && city.toLowerCase() !== value.toLowerCase()
      );
      if (field === 'from') setFromSuggestions(filtered);
      else setToSuggestions(filtered);
    } else {
      if (field === 'from') setFromSuggestions([]);
      else setToSuggestions([]);
    }
  };

  const selectSuggestion = (city, field) => {
    setFormData(prev => ({ ...prev, [field]: city }));
    if (field === 'from') setFromSuggestions([]);
    else setToSuggestions([]);
  };

  const updatePassenger = (type, operation) => {
    setFormData(prev => {
      const current = prev.passengers[type];
      let next = current;
      if (operation === 'add') next = current + 1;
      if (operation === 'sub') next = Math.max(0, current - 1);
      if (type === 'adults' && next < 1) next = 1;

      return {
        ...prev,
        passengers: { ...prev.passengers, [type]: next }
      };
    });
  };

  const getTotalPassengers = () => {
    const { adults, children, infants } = formData.passengers;
    const parts = [];
    if (adults > 0) parts.push(`${adults} ${adults === 1 ? 'Adult' : 'Adults'}`);
    if (children > 0) parts.push(`${children} ${children === 1 ? 'Child' : 'Children'}`);
    if (infants > 0) parts.push(`${infants} ${infants === 1 ? 'Infant' : 'Infants'}`);
    return parts.length > 0 ? parts.join(', ') : 'Select Passengers';
  };

  const isFormValid = () => {
    const { from, to, date, passengers } = formData;
    const totalSelected = passengers.adults + passengers.children + passengers.infants;
    return (
      CITIES.includes(from) && 
      CITIES.includes(to) && 
      from !== to &&
      date !== '' && 
      totalSelected > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    const total = formData.passengers.adults + formData.passengers.children + formData.passengers.infants;
    onSearch({ ...formData, passengers: total, passengerDetails: formData.passengers });
  };

  return (
    <div className={`search-form-container glass-panel animate-scale-in ${isPassengersOpen ? 'dropdown-open' : ''}`}>
      {/* Mobile Overlay */}
      <div className="mobile-overlay" onClick={() => setIsPassengersOpen(false)}></div>
      
      <form className="search-form" onSubmit={handleSubmit}>
        
        {/* From Field */}
        <div className="input-group" ref={fromRef}>
          <label>From</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" size={20} />
            <input 
              type="text" 
              placeholder="Origin City" 
              value={formData.from}
              onChange={(e) => handleInputChange(e, 'from')}
              autoComplete="off"
            />
          </div>
          {fromSuggestions.length > 0 && (
            <div className="autocomplete-suggestions animate-fade-in">
              {fromSuggestions.map(city => (
                <div key={city} className="suggestion-item" onClick={() => selectSuggestion(city, 'from')}>
                  <MapPin size={14} /> <span>{city}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* To Field */}
        <div className="input-group" ref={toRef}>
          <label>To</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" size={20} style={{ color: 'var(--color-secondary)'}} />
            <input 
              type="text" 
              placeholder="Destination City" 
              value={formData.to}
              onChange={(e) => handleInputChange(e, 'to')}
              autoComplete="off"
            />
          </div>
          {toSuggestions.length > 0 && (
            <div className="autocomplete-suggestions animate-fade-in">
              {toSuggestions.map(city => (
                <div key={city} className="suggestion-item" onClick={() => selectSuggestion(city, 'to')}>
                  <MapPin size={14} /> <span>{city}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Field */}
        <div className="input-group date-group">
          <label>Departure</label>
          <div 
            className="input-wrapper" 
            onClick={() => dateInputRef.current?.showPicker && dateInputRef.current.showPicker()}
            style={{ cursor: 'pointer' }}
          >
            <Calendar className="input-icon" size={20} />
            <input 
              type="date" 
              name="date" 
              value={formData.date}
              onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
              ref={dateInputRef}
              min={new Date().toISOString().split('T')[0]} 
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Passengers Field */}
        <div className="input-group passengers-group" ref={passengerRef}>
          <label>Passengers</label>
          <div className="input-wrapper custom-select-wrapper" onClick={() => setIsPassengersOpen(!isPassengersOpen)}>
            <Users className="input-icon" size={20} />
            <div className="custom-select-display" style={{ fontSize: '0.9rem' }}>
              {getTotalPassengers()}
            </div>
            {isPassengersOpen && (
              <div className="custom-select-dropdown advanced-dropdown animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="passenger-row">
                  <div className="passenger-info">
                    <span className="passenger-type">Adults</span>
                    <span className="passenger-desc">Age 13+</span>
                  </div>
                  <div className="passenger-controls">
                    <button type="button" className="ctrl-btn" onClick={() => updatePassenger('adults', 'sub')} disabled={formData.passengers.adults <= 1}><Minus size={16} /></button>
                    <span className="count">{formData.passengers.adults}</span>
                    <button type="button" className="ctrl-btn" onClick={() => updatePassenger('adults', 'add')}><Plus size={16} /></button>
                  </div>
                </div>
                <div className="passenger-row">
                  <div className="passenger-info">
                    <span className="passenger-type">Children</span>
                    <span className="passenger-desc">Age 2-12</span>
                  </div>
                  <div className="passenger-controls">
                    <button type="button" className="ctrl-btn" onClick={() => updatePassenger('children', 'sub')} disabled={formData.passengers.children <= 0}><Minus size={16} /></button>
                    <span className="count">{formData.passengers.children}</span>
                    <button type="button" className="ctrl-btn" onClick={() => updatePassenger('children', 'add')}><Plus size={16} /></button>
                  </div>
                </div>
                <div className="passenger-row">
                  <div className="passenger-info">
                    <span className="passenger-type">Infants</span>
                    <span className="passenger-desc">Under 2</span>
                  </div>
                  <div className="passenger-controls">
                    <button type="button" className="ctrl-btn" onClick={() => updatePassenger('infants', 'sub')} disabled={formData.passengers.infants <= 0}><Minus size={16} /></button>
                    <span className="count">{formData.passengers.infants}</span>
                    <button type="button" className="ctrl-btn" onClick={() => updatePassenger('infants', 'add')}><Plus size={16} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-group">
          <button 
            type="submit" 
            className="btn btn-primary search-btn"
            disabled={!isFormValid()}
          >
            <span>Search Flights</span>
            <ArrowRight size={20} className="arrow-icon" />
          </button>
        </div>

      </form>
    </div>
  );
};

export default SearchForm;
