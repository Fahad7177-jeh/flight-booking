import React, { useContext, useState } from 'react';
import { Calendar, MapPin, Plane, Bed, Users, Trash2 } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';

const MyTrips = () => {
  const { bookings, hotelBookings, cancelBooking, cancelHotelBooking } = useContext(BookingContext);
  const [activeTab, setActiveTab] = useState('flights');

  const allTripsCount = bookings.length + hotelBookings.length;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'left', marginBottom: '0.5rem' }}>My Itineraries</h1>
        <p className="hero-subtitle" style={{ textAlign: 'left' }}>Manage your booked flights and luxury stays.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('flights')}
          style={{ 
            padding: '0.5rem 1.5rem', borderRadius: '8px', 
            background: activeTab === 'flights' ? 'var(--color-primary)' : 'transparent',
            color: activeTab === 'flights' ? 'white' : 'var(--color-text-secondary)',
            fontWeight: 600, transition: 'all 0.3s'
          }}
        >
          Flights ({bookings.length})
        </button>
        <button 
          onClick={() => setActiveTab('hotels')}
          style={{ 
            padding: '0.5rem 1.5rem', borderRadius: '8px', 
            background: activeTab === 'hotels' ? 'var(--color-primary)' : 'transparent',
            color: activeTab === 'hotels' ? 'white' : 'var(--color-text-secondary)',
            fontWeight: 600, transition: 'all 0.3s'
          }}
        >
          Hotels ({hotelBookings.length})
        </button>
      </div>

      {activeTab === 'flights' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              <Plane size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <h3>No flights booked yet</h3>
            </div>
          ) : (
            bookings.map(booking => {
              const flight = booking.flightDetails;
              const isCancelled = booking.status === 'Cancelled';
              return (
                <div key={booking.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isCancelled ? 0.6 : 1 }}>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: isCancelled ? 'rgba(255,255,255,0.1)' : 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <Plane size={28} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{flight.from} → {flight.to}</h3>
                      <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        <span><Calendar size={14} /> {new Date(booking.bookingDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{flight.airline} ({flight.flightNumber})</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: isCancelled ? '#ef4444' : 'var(--color-primary)', fontWeight: 700 }}>{booking.status.toUpperCase()}</div>
                    {!isCancelled && <button onClick={() => cancelBooking(booking.id)} className="btn" style={{ color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Trash2 size={14} /> Cancel</button>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {hotelBookings.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              <Bed size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <h3>No hotels booked yet</h3>
            </div>
          ) : (
            hotelBookings.map(hotel => {
              const isCancelled = hotel.status === 'Cancelled';
              return (
                <div key={hotel.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isCancelled ? 0.6 : 1 }}>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src={hotel.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{hotel.hotelName}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}><MapPin size={14} /> {hotel.location}, {hotel.city}</p>
                      <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                        <span><Calendar size={14} /> {hotel.checkIn} - {hotel.checkOut}</span>
                        <span>•</span>
                        <span><Users size={14} /> {hotel.guests.adults} Adults</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: isCancelled ? '#ef4444' : 'var(--color-primary)', fontWeight: 700 }}>{hotel.status.toUpperCase()}</div>
                    {!isCancelled && <button onClick={() => cancelHotelBooking(hotel.id)} className="btn" style={{ color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Trash2 size={14} /> Cancel</button>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyTrips;

