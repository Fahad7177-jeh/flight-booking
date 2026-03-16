import React, { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, Clock, ArrowRight } from 'lucide-react';
import './FlightCard.css';

const FlightCard = ({ flight, onSelect, style }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`flight-card glass-panel animate-fade-in ${expanded ? 'expanded' : ''}`}
      style={style}
    >
      <div className="flight-card-main" onClick={() => setExpanded(!expanded)}>
        <div className="flight-airline">
          <div className="airline-logo">
            <PlaneTakeoff size={24} />
          </div>
          <div>
            <h3>{flight.airline}</h3>
            <span className="flight-num text-gradient">{flight.flightNumber}</span>
          </div>
        </div>

        <div className="flight-journey">
          <div className="time-col">
            <span className="time">{flight.departureTime}</span>
            <span className="city">{flight.from}</span>
          </div>
          
          <div className="journey-line-container">
            <div className="duration">
              <Clock size={14} /> {flight.duration}
            </div>
            <div className="journey-line">
              <div className="line" />
              <PlaneTakeoff className="plane-icon" size={20} />
            </div>
            <div className="stops">{flight.stops}</div>
          </div>

          <div className="time-col">
            <span className="time">{flight.arrivalTime}</span>
            <span className="city">{flight.to}</span>
          </div>
        </div>

        <div className="flight-price-preview">
          <span className="starting-at">Starting from</span>
          <span className="price">${flight.classes.economy.price}</span>
        </div>
      </div>

      {expanded && (
        <div className="flight-classes animate-slide-up">
          {['economy', 'business', 'first'].map((className) => {
            const classData = flight.classes[className];
            return (
              <div 
                key={className} 
                className={`class-card ${!classData.available ? 'unavailable' : ''}`}
              >
                <div className="class-header">
                  <span className="class-name">{className.toUpperCase()}</span>
                  <span className="class-price">${classData.price}</span>
                </div>
                <ul className="class-features">
                  <li>{className === 'economy' ? 'Standard Seat' : className === 'business' ? 'Extra Legroom' : 'Lie-flat Bed'}</li>
                  <li>{className === 'economy' ? '1 Checked Bag' : className === 'business' ? '2 Checked Bags' : '3 Checked Bags'}</li>
                  <li>{className === 'economy' ? 'Standard Meal' : 'Premium Dining'}</li>
                </ul>
                <button 
                  className={`btn ${className === 'economy' ? 'btn-secondary' : 'btn-primary'} select-btn`}
                  disabled={!classData.available}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(className);
                  }}
                >
                  {classData.available ? 'Select' : 'Sold Out'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlightCard;
