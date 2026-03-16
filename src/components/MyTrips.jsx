import React, { useContext, useState } from 'react';
import { Calendar, MapPin, Plane, Bed, Users, Trash2 } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';
import './MyTrips.css';

const MyTrips = () => {
  const { bookings, hotelBookings, cancelBooking, cancelHotelBooking } = useContext(BookingContext);
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div className="my-trips-container animate-fade-in">
      <div className="my-trips-header">
        <h1 className="hero-title">My Itineraries</h1>
        <p className="hero-subtitle">Manage your booked flights and luxury stays.</p>
      </div>

      <div className="my-trips-tabs">
        <button 
          onClick={() => setActiveTab('flights')}
          className={`tab-btn ${activeTab === 'flights' ? 'active' : ''}`}
        >
          Flights ({bookings.length})
        </button>
        <button 
          onClick={() => setActiveTab('hotels')}
          className={`tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
        >
          Hotels ({hotelBookings.length})
        </button>
      </div>

      <div className="trips-grid">
        {activeTab === 'flights' ? (
          <>
            {bookings.length === 0 ? (
              <div className="glass-panel empty-state">
                <Plane size={48} className="empty-state-icon" />
                <h3>No flights booked yet</h3>
              </div>
            ) : (
              bookings.map(booking => {
                const flight = booking.flightDetails;
                const isCancelled = booking.status === 'Cancelled';
                return (
                  <div key={booking.id} className={`glass-panel trip-card ${isCancelled ? 'cancelled' : ''}`}>
                    <div className="trip-main-info">
                      <div className="trip-icon-box">
                        <Plane size={28} />
                      </div>
                      <div className="trip-details">
                        <h3>{flight.from} → {flight.to}</h3>
                        <div className="trip-meta">
                          <span className="trip-meta-item"><Calendar size={14} /> {new Date(booking.bookingDate).toLocaleDateString()}</span>
                          <span className="mobile-only">•</span>
                          <span className="trip-meta-item">{flight.airline} ({flight.flightNumber})</span>
                        </div>
                      </div>
                    </div>
                    <div className="trip-status-area">
                      <div className={`status-badge ${isCancelled ? 'cancelled' : 'confirmed'}`}>{booking.status.toUpperCase()}</div>
                      {!isCancelled && (
                        <button onClick={() => cancelBooking(booking.id)} className="btn cancel-action-btn">
                          <Trash2 size={14} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </>
        ) : (
          <>
            {hotelBookings.length === 0 ? (
              <div className="glass-panel empty-state">
                <Bed size={48} className="empty-state-icon" />
                <h3>No hotels booked yet</h3>
              </div>
            ) : (
              hotelBookings.map(hotel => {
                const isCancelled = hotel.status === 'Cancelled';
                return (
                  <div key={hotel.id} className={`glass-panel trip-card ${isCancelled ? 'cancelled' : ''}`}>
                    <div className="trip-main-info">
                      <div className="hotel-img-box">
                        <img src={hotel.image} alt={hotel.hotelName} />
                      </div>
                      <div className="trip-details">
                        <h3>{hotel.hotelName}</h3>
                        <p className="trip-meta-item" style={{ marginBottom: '0.4rem' }}><MapPin size={14} /> {hotel.location}, {hotel.city}</p>
                        <div className="trip-meta">
                          <span className="trip-meta-item"><Calendar size={14} /> {hotel.checkIn} - {hotel.checkOut}</span>
                          <span className="mobile-only">•</span>
                          <span className="trip-meta-item"><Users size={14} /> {hotel.guests.adults} Adults</span>
                        </div>
                      </div>
                    </div>
                    <div className="trip-status-area">
                      <div className={`status-badge ${isCancelled ? 'cancelled' : 'confirmed'}`}>{hotel.status.toUpperCase()}</div>
                      {!isCancelled && (
                        <button onClick={() => cancelHotelBooking(hotel.id)} className="btn cancel-action-btn">
                          <Trash2 size={14} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyTrips;

