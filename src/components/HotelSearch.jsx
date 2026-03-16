import React, { useState, useRef, useEffect, useContext } from 'react';
import { Bed, MapPin, Calendar, Users, ArrowRight, Plus, Minus, Star, CheckCircle } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';
import { AuthContext } from '../context/AuthContext';

const mockHotels = [
  { id: 1, name: 'Grand Royal Hotel', city: 'Hyderabad', rating: 4.8, price: 150, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400', location: 'Banjara Hills' },
  { id: 2, name: 'Golkonda Resort', city: 'Hyderabad', rating: 4.5, price: 200, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400', location: 'Gandipet' },
  { id: 3, name: 'The Park Hyderabad', city: 'Hyderabad', rating: 4.6, price: 120, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400', location: 'Somajiguda' },
  { id: 4, name: 'Parisian Palace', city: 'Paris', rating: 4.9, price: 450, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400', location: 'Eiffel Tower District' },
  { id: 5, name: 'Le Cinema Hotel', city: 'Paris', rating: 4.4, price: 220, image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&q=80&w=400', location: 'Montmartre' },
  { id: 6, name: 'Tokyo Tower View', city: 'Tokyo', rating: 4.7, price: 300, image: 'https://images.unsplash.com/photo-1540959733332-e94e270b2ec0?auto=format&fit=crop&q=80&w=400', location: 'Minato' },
  { id: 7, name: 'Shibuya Sky Hotel', city: 'Tokyo', rating: 4.3, price: 180, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=400', location: 'Shibuya' },
];

const HotelSearch = () => {
  const { addHotelBooking } = useContext(BookingContext);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({}); // hotelId -> 'available' | 'confirming' | 'booked'
  
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    config: {
      adults: 2,
      children: 0,
      rooms: 1
    }
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const configRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (configRef.current && !configRef.current.contains(event.target)) {
        setIsConfigOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!destination) return;
    
    setLoading(true);
    setHasSearched(true);
    
    // Simulate API search
    setTimeout(() => {
      const filtered = mockHotels.filter(hotel => 
        hotel.city.toLowerCase().includes(destination.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
      
      // Initialize statuses
      const statuses = {};
      filtered.forEach(h => { statuses[h.id] = 'available'; });
      setBookingStatus(statuses);

      window.scrollTo({ top: 600, behavior: 'smooth' });
    }, 1200);
  };

  const handleHotelBooking = (hotel) => {
    if (!currentUser) {
      alert("Please Sign In to book a hotel.");
      return;
    }

    const currentStatus = bookingStatus[hotel.id];

    if (currentStatus === 'available') {
      setBookingStatus(prev => ({ ...prev, [hotel.id]: 'confirming' }));
    } else if (currentStatus === 'confirming') {
      // Create the booking
      const hotelBooking = {
        hotelName: hotel.name,
        city: hotel.city,
        location: hotel.location,
        pricePerNight: hotel.price,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.config,
        image: hotel.image
      };
      
      addHotelBooking(hotelBooking);
      setBookingStatus(prev => ({ ...prev, [hotel.id]: 'booked' }));
      
      setTimeout(() => {
        alert("Hotel booked successfully! You can view it in My Trips.");
      }, 100);
    }
  };

  const updateConfig = (type, operation) => {
    setBookingData(prev => {
      const current = prev.config[type];
      let next = current;
      if (operation === 'add') next = current + 1;
      if (operation === 'sub') next = Math.max(0, current - 1);
      
      // Validation rules
      if (type === 'adults' && next < 1) next = 1;
      if (type === 'rooms' && next < 1) next = 1;

      return {
        ...prev,
        config: { ...prev.config, [type]: next }
      };
    });
  };

  const getConfigSummary = () => {
    const { adults, children, rooms } = bookingData.config;
    return `${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children !== 1 ? 'ren' : ''} • ${rooms} Room${rooms > 1 ? 's' : ''}`;
  };

  return (
    <div className="hotel-search-container animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3.5rem' }}>Luxury Accommodations</h1>
        <p className="hero-subtitle">Curated premium stays for the discerning traveler.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
          
          {/* Destination */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Destination</label>
            <div className="input-wrapper">
              <MapPin size={20} className="input-icon" />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ width: '100%', paddingLeft: '3rem', height: '3.5rem' }} 
              />
            </div>
          </div>

          {/* Range Dates */}
          <div style={{ flex: '1 1 350px', display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Check-in</label>
              <div className="input-wrapper" onClick={() => checkInRef.current?.showPicker && checkInRef.current.showPicker()} style={{ cursor: 'pointer' }}>
                <Calendar size={20} className="input-icon" />
                <input 
                  type="date" 
                  ref={checkInRef}
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ width: '100%', paddingLeft: '3rem', height: '3.5rem', cursor: 'pointer' }} 
                />
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Check-out</label>
              <div className="input-wrapper" onClick={() => checkOutRef.current?.showPicker && checkOutRef.current.showPicker()} style={{ cursor: 'pointer' }}>
                <Calendar size={20} className="input-icon" />
                <input 
                  type="date" 
                  ref={checkOutRef}
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                  min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                  style={{ width: '100%', paddingLeft: '3rem', height: '3.5rem', cursor: 'pointer' }} 
                />
              </div>
            </div>
          </div>

          {/* Guests & Rooms */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} ref={configRef}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Guests & Rooms</label>
            <div className="input-wrapper custom-select-wrapper" onClick={() => setIsConfigOpen(!isConfigOpen)}>
              <Users size={20} className="input-icon" />
              <div className="custom-select-display" style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {getConfigSummary()}
              </div>
              
              {isConfigOpen && (
                <div className="custom-select-dropdown advanced-dropdown animate-fade-in" style={{ width: '320px', padding: '1.5rem', top: '100%', left: '0' }} onClick={e => e.stopPropagation()}>
                  <div className="passenger-row" style={{ marginBottom: '1rem' }}>
                    <div className="passenger-info">
                      <span className="passenger-type">Adults</span>
                      <span className="passenger-desc">Ages 18+</span>
                    </div>
                    <div className="passenger-controls">
                      <button type="button" className="ctrl-btn" onClick={() => updateConfig('adults', 'sub')} disabled={bookingData.config.adults <= 1}><Minus size={14} /></button>
                      <span className="count">{bookingData.config.adults}</span>
                      <button type="button" className="ctrl-btn" onClick={() => updateConfig('adults', 'add')}><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="passenger-row" style={{ marginBottom: '1rem' }}>
                    <div className="passenger-info">
                      <span className="passenger-type">Children</span>
                      <span className="passenger-desc">Ages 0-17</span>
                    </div>
                    <div className="passenger-controls">
                      <button type="button" className="ctrl-btn" onClick={() => updateConfig('children', 'sub')} disabled={bookingData.config.children <= 0}><Minus size={14} /></button>
                      <span className="count">{bookingData.config.children}</span>
                      <button type="button" className="ctrl-btn" onClick={() => updateConfig('children', 'add')}><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="passenger-row">
                    <div className="passenger-info">
                      <span className="passenger-type">Rooms</span>
                    </div>
                    <div className="passenger-controls">
                      <button type="button" className="ctrl-btn" onClick={() => updateConfig('rooms', 'sub')} disabled={bookingData.config.rooms <= 1}><Minus size={14} /></button>
                      <span className="count">{bookingData.config.rooms}</span>
                      <button type="button" className="ctrl-btn" onClick={() => updateConfig('rooms', 'add')}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ height: '3.5rem', padding: '0 2rem' }}
            disabled={!destination}
          >
            <ArrowRight size={20} /> Search Stays
          </button>
        </form>
      </div>

      {/* Results Area */}
      <div className="results-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div className="radar-animation" style={{ margin: '0 auto 2rem' }}></div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>Finding premium stays in <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{destination}</span>...</p>
          </div>
        )}

        {!loading && hasSearched && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>{results.length} Properties found in {destination}</h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Prices include taxes and fees</div>
            </div>

            {results.length === 0 ? (
              <div className="glass-panel" style={{ padding: '5rem', textAlign: 'center' }}>
                <Bed size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <h3>No hotels found for this city</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>Try searching for cities like "Hyderabad", "Paris", or "Tokyo".</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {results.map(hotel => (
                  <div key={hotel.id} className="glass-panel hotel-card animate-slide-up" style={{ overflow: 'hidden', padding: 0 }}>
                    <div style={{ height: '220px', position: 'relative' }}>
                      <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(15, 16, 21, 0.8)', padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.25rem', backdropFilter: 'blur(8px)' }}>
                        <Star size={16} fill="var(--color-primary)" color="var(--color-primary)" />
                        <span style={{ fontWeight: 700 }}>{hotel.rating}</span>
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.4rem' }}>{hotel.name}</h3>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>${hotel.price}</span>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>per night</div>
                        </div>
                      </div>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                        <MapPin size={16} /> {hotel.location}, {hotel.city}
                      </p>
                      
                      {bookingStatus[hotel.id] === 'booked' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600, padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', justifyContent: 'center' }}>
                          <CheckCircle size={20} /> Hotel Booked Successfully
                        </div>
                      ) : (
                        <button 
                          className={`btn ${bookingStatus[hotel.id] === 'confirming' ? 'btn-secondary' : 'btn-primary'}`} 
                          style={{ width: '100%' }}
                          onClick={() => handleHotelBooking(hotel)}
                        >
                          {bookingStatus[hotel.id] === 'confirming' ? 'Click to Confirm Book Now' : 'View Availability'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;

