import React, { useEffect } from 'react';
import { CheckCircle, Download, Home, Share2, Printer } from 'lucide-react';
import './Confirmation.css';

const Confirmation = ({ bookingDetails, flight, onReset }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const bookingId = bookingDetails.id || 'AF-88291';
  const passengerDetails = bookingDetails.passengerDetails || bookingDetails;

  const handleDownload = () => {
    // We use window.print() but first we apply print-specific styles
    // The user wants a "Download Ticket" (PDF). Native browser print is the best for this.
    window.print();
  };

  return (
    <div className="confirmation-container">
      {/* Printable Area - Hidden on screen, shown in print via CSS */}
      <div className="printable-ticket" id="ticket-to-print">
        <div className="print-header">
          <h1>AeroSpace E-Ticket</h1>
          <p>Booking Reference: <strong>{bookingId}</strong></p>
        </div>
        <div className="print-body">
          <div className="print-row">
            <span>Passenger</span>
            <strong>{passengerDetails.firstName} {passengerDetails.lastName}</strong>
          </div>
          <div className="print-row">
            <span>Flight</span>
            <strong>{flight.airline} {flight.flightNumber}</strong>
          </div>
          <div className="print-row">
            <span>Route</span>
            <strong>{flight.from} to {flight.to}</strong>
          </div>
          <div className="print-row">
            <span>Time</span>
            <strong>{flight.departureTime} - {flight.arrivalTime}</strong>
          </div>
          <div className="print-row">
            <span>Seat</span>
            <strong>{Math.floor(Math.random() * 30) + 1}F</strong>
          </div>
        </div>
        <div className="print-footer">
          <p>This is a computer-generated ticket. Please present at check-in.</p>
        </div>
      </div>

      <div className="success-icon-wrapper animate-scale-in">
        <div className="pulse-ring"></div>
        <CheckCircle size={64} className="success-icon" />
      </div>

      <div className="confirmation-header animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-gradient">Booking Confirmed!</h2>
        <p>Thank you, {passengerDetails.firstName}. Your flight is booked and confirmed.</p>
        <div className="booking-ref">
          <span>Booking Reference: </span>
          <strong>{bookingId}</strong>
        </div>
      </div>

      <div className="ticket-card glass-panel animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="ticket-header">
          <div className="airline-info">
            <span className="airline-name">{flight.airline}</span>
            <span className="flight-number">{flight.flightNumber}</span>
          </div>
          <div className="class-badge">
            {flight.selectedClass?.toUpperCase() || 'ECONOMY'}
          </div>
        </div>

        <div className="ticket-body">
          <div className="route-large">
            <div className="city-info">
              <span className="time">{flight.departureTime}</span>
              <span className="city">{flight.from}</span>
            </div>
            
            <div className="plane-graphic">
               <div className="dotted-line"></div>
               <span className="duration">{flight.duration}</span>
            </div>

            <div className="city-info right">
              <span className="time">{flight.arrivalTime}</span>
              <span className="city">{flight.to}</span>
            </div>
          </div>

          <div className="passenger-details-grid">
            <div className="detail-item">
              <span className="label">Passenger</span>
              <span className="value">{passengerDetails.firstName} {passengerDetails.lastName}</span>
            </div>
            <div className="detail-item">
              <span className="label">Class</span>
              <span className="value" style={{textTransform: 'capitalize'}}>{flight.selectedClass || 'Economy'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Gate</span>
              <span className="value">A{Math.floor(Math.random() * 20) + 1}</span>
            </div>
            <div className="detail-item">
              <span className="label">Seat</span>
              <span className="value">{Math.floor(Math.random() * 30) + 1}{['A','B','C','D','E','F'][Math.floor(Math.random() * 6)]}</span>
            </div>
          </div>
        </div>

        <div className="ticket-footer">
           <div className="barcode">
             <div className="bars"></div>
           </div>
        </div>
      </div>

      <div className="action-buttons animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <button className="btn btn-primary action-btn" onClick={handleDownload}>
          <Download size={18} /> Download Ticket
        </button>
        <button className="btn btn-secondary action-btn" onClick={onReset}>
          <Home size={18} /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;

