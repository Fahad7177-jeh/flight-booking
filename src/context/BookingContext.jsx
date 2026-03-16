import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('aerospace_trips') || '{}');
    setBookings(stored.flights || []);
    setHotelBookings(stored.hotels || []);
  }, []);

  const saveToStorage = (flights, hotels) => {
    localStorage.setItem('aerospace_trips', JSON.stringify({ flights, hotels }));
  };

  const addBooking = (bookingDetails) => {
    if (!currentUser) return false;

    const newBooking = {
      ...bookingDetails,
      id: `FL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: currentUser.id,
      bookingDate: new Date().toISOString(),
      status: 'Upcoming',
      type: 'flight'
    };

    const updated = [...bookings, newBooking];
    setBookings(updated);
    saveToStorage(updated, hotelBookings);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    const updated = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    );
    setBookings(updated);
    saveToStorage(updated, hotelBookings);
  };

  const addHotelBooking = (hotelDetails) => {
    if (!currentUser) return false;

    const newBooking = {
      ...hotelDetails,
      id: `HTL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: currentUser.id,
      bookingDate: new Date().toISOString(),
      status: 'Upcoming',
      type: 'hotel'
    };

    const updated = [...hotelBookings, newBooking];
    setHotelBookings(updated);
    saveToStorage(bookings, updated);
    return newBooking;
  };

  const cancelHotelBooking = (bookingId) => {
    const updated = hotelBookings.map(h => 
      h.id === bookingId ? { ...h, status: 'Cancelled' } : h
    );
    setHotelBookings(updated);
    saveToStorage(bookings, updated);
  };

  const userBookings = bookings.filter(b => currentUser && b.userId === currentUser.id);
  const userHotelBookings = hotelBookings.filter(h => currentUser && h.userId === currentUser.id);

  return (
    <BookingContext.Provider value={{ 
      bookings: userBookings, 
      hotelBookings: userHotelBookings,
      addBooking, 
      cancelBooking,
      addHotelBooking,
      cancelHotelBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};
