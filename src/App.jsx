import React, { useState, useContext, useEffect } from 'react';
import { Plane, LogIn, UserPlus, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import './App.css';
import { AuthContext } from './context/AuthContext';

// Components
import SearchForm from './components/SearchForm';
import FlightList from './components/FlightList';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import HotelSearch from './components/HotelSearch';
import AuthPages from './components/AuthPages';
import MyTrips from './components/MyTrips';
import HomeExtras from './components/HomeExtras';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  const { currentUser, logout } = useContext(AuthContext);

  // Main Navigation State
  const [activeView, setActiveView] = useState('home');
  const [authMode, setAuthMode] = useState('signin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Flight Specific States
  const [flightState, setFlightState] = useState('search');
  const [searchParams, setSearchParams] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Navigation Handlers
  const handleNavClick = (view) => {
    if (view === 'mytrips' && !currentUser) {
      setAuthMode('signin');
      setActiveView('auth');
    } else {
      setActiveView(view);
      if (view === 'flights') {
        setFlightState('search');
      }
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setActiveView('auth');
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    if (activeView === 'mytrips') {
      setActiveView('home');
    }
    setMobileMenuOpen(false);
  };

  // Flight Handlers
  const handleFlightSearch = (params) => {
    setSearchParams(params);
    setFlightState('results');
    setActiveView('flights');
  };

  const handleSelectFlight = (flight, selectedClass) => {
    setSelectedFlight({ ...flight, selectedClass });
    setFlightState('booking');
  };

  const handleBook = (details) => {
    setBookingDetails(details);
    setFlightState('confirmation');
  };

  const resetFlightSearch = () => {
    setFlightState('search');
    setSearchParams(null);
    setSelectedFlight(null);
    setBookingDetails(null);
  };

  return (
    <div className="app-container">
      {/* --- TOP NAVIGATION --- */}
      <nav className="top-nav">
        <div className="logo" onClick={() => handleNavClick('home')}>
          <div className="logo-icon">
            <Plane size={24} />
          </div>
          <span>Aero<span className="text-gradient">Space</span></span>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <span className={`nav-link ${activeView === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>Home</span>
          <span className={`nav-link ${activeView === 'flights' ? 'active' : ''}`} onClick={() => handleNavClick('flights')}>Flights</span>
          <span className={`nav-link ${activeView === 'hotels' ? 'active' : ''}`} onClick={() => handleNavClick('hotels')}>Hotels</span>
          <span className={`nav-link ${activeView === 'mytrips' ? 'active' : ''}`} onClick={() => handleNavClick('mytrips')}>My Trips</span>
          
          {/* Mobile Auth Actions (visible only on mobile nav) */}
          <div className="mobile-auth-actions">
             {currentUser ? (
               <>
                 <div className="user-greeting">Hi, {currentUser.name.split(' ')[0]}</div>
                 <button className="btn btn-secondary w-full" onClick={handleLogout}>
                   <LogOut size={18} /> Sign Out
                 </button>
               </>
             ) : (
               <>
                 <button className="btn btn-secondary w-full" onClick={() => handleAuthClick('signin')}>Sign In</button>
                 <button className="btn btn-primary w-full" onClick={() => handleAuthClick('signup')}>Create Account</button>
               </>
             )}
          </div>
        </div>

        {/* Desktop Auth Actions */}
        <div className="nav-actions desktop-auth-actions">
          {currentUser ? (
            <div className="user-profile-menu">
              <div className="user-avatar">
                <UserIcon size={18} />
              </div>
              <span className="user-name">{currentUser.name.split(' ')[0]}</span>
              <button className="logout-btn" onClick={handleLogout} title="Sign Out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <button className="btn btn-secondary nav-btn" onClick={() => handleAuthClick('signin')}>
                <LogIn size={18} /> Sign In
              </button>
              <button className="btn btn-primary nav-btn" onClick={() => handleAuthClick('signup')}>
                <UserPlus size={18} /> Create Account
              </button>
            </>
          )}
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main>
        {/* VIEW: HOME */}
        {activeView === 'home' && (
          <div className="main-content-transition">
            <section className="hero-section animate-slide-up">
              <h1 className="hero-title">
                Experience The World's <br />
                <span className="text-gradient">Most Premium Travel</span>
              </h1>
              <p className="hero-subtitle">
                AeroSpace combines seamless bookings, luxury accommodations, and aesthetic experiences.
              </p>
              <SearchForm onSearch={handleFlightSearch} />
            </section>
            
            <HomeExtras />
          </div>
        )}

        {/* VIEW: FLIGHT FLOW */}
        {activeView === 'flights' && (
          <div className="flight-container">
            {flightState === 'search' && (
              <section className="hero-section animate-slide-up">
                 <h1 className="hero-title flight-hero-title">Find Your Flight</h1>
                 <p className="hero-subtitle">Book flights to anywhere globally with zero hassle.</p>
                 <SearchForm onSearch={handleFlightSearch} />
              </section>
            )}

            {flightState === 'results' && (
              <section className="main-content-transition">
                <FlightList 
                  searchParams={searchParams} 
                  onSelectFlight={handleSelectFlight}
                  onBack={resetFlightSearch}
                />
              </section>
            )}

            {flightState === 'booking' && (
              <section className="main-content-transition">
                 <BookingForm 
                  flight={selectedFlight} 
                  onBook={handleBook}
                  onBack={() => setFlightState('results')}
                />
              </section>
            )}

            {flightState === 'confirmation' && (
              <section className="main-content-transition">
                <Confirmation 
                  bookingDetails={bookingDetails} 
                  flight={selectedFlight} 
                  onReset={() => handleNavClick('home')}
                />
              </section>
            )}
          </div>
        )}

        {/* VIEW: HOTELS */}
        {activeView === 'hotels' && (
           <section className="main-content-transition">
             <HotelSearch />
           </section>
        )}

        {/* VIEW: MY TRIPS */}
        {activeView === 'mytrips' && currentUser && (
           <section className="main-content-transition">
             <MyTrips />
           </section>
        )}

        {/* VIEW: AUTHENTICATION */}
        {activeView === 'auth' && (
           <section className="main-content-transition">
             <AuthPages initialMode={authMode} onLoginSuccess={() => handleNavClick('home')} />
           </section>
        )}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
