import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Plane } from 'lucide-react';
import FlightCard from './FlightCard';
import './FlightList.css';

// Mock Data Generator inside the component
const generateMockFlights = (from, to) => {
  const airlines = ['SkyLink Airways', 'Nova Jet', 'AeroPrime', 'Global Wings'];
  
  return Array.from({ length: 5 }).map((_, i) => {
    const isDirect = Math.random() > 0.3;
    const basePrice = Math.floor(Math.random() * 400) + 150;
    const durationHours = Math.floor(Math.random() * 8) + 1;
    const durationMins = Math.floor(Math.random() * 60);
    
    // Time generators
    const departureHour = Math.floor(Math.random() * 24);
    const departureMin = Math.floor(Math.random() * 60);
    const arrivalHour = (departureHour + durationHours) % 24;
    const arrivalMin = (departureMin + durationMins) % 60;

    const pad = (n) => n.toString().padStart(2, '0');

    return {
      id: `fl-${i}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      flightNumber: `FL-${1000 + Math.floor(Math.random() * 8999)}`,
      departureTime: `${pad(departureHour)}:${pad(departureMin)}`,
      arrivalTime: `${pad(arrivalHour)}:${pad(arrivalMin)}`,
      duration: `${durationHours}h ${durationMins}m`,
      stops: isDirect ? 'Direct' : '1 Stop',
      from: from || 'Origin',
      to: to || 'Destination',
      classes: {
        economy: { price: basePrice, available: true },
        business: { price: basePrice * 2.5, available: Math.random() > 0.2 },
        first: { price: basePrice * 4, available: Math.random() > 0.5 },
      }
    };
  });
};

const FlightList = ({ searchParams, onSelectFlight, onBack }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay for aesthetic loading effect
    setLoading(true);
    const timer = setTimeout(() => {
      setFlights(generateMockFlights(searchParams?.from, searchParams?.to));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="flight-list-container">
      {/* Header Bar */}
      <div className="results-header animate-slide-up">
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="route-info text-gradient">
          <span className="city">{searchParams?.from || 'Origin'}</span>
          <Plane className="route-icon" size={20} />
          <span className="city">{searchParams?.to || 'Destination'}</span>
        </div>
        <div className="search-meta">
          <span>{searchParams?.date || 'Select Date'}</span> • 
          <span>{searchParams?.passengers} Passenger(s)</span>
        </div>
      </div>

      {/* Content */}
      <div className="results-content">
        {loading ? (
          <div className="loading-state">
            <div className="radar-spinner"></div>
            <p className="loading-text animate-pulse">Searching the skies for best flights...</p>
          </div>
        ) : (
          <div className="flights-grid">
            {flights.map((flight, idx) => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onSelect={(selectedClass) => onSelectFlight(flight, selectedClass)}
                style={{ animationDelay: `${idx * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightList;
