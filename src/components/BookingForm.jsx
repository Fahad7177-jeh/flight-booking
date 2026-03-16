import React, { useState, useContext } from 'react';
import { User, Mail, Phone, CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';
import './BookingForm.css';
import { BookingContext } from '../context/BookingContext';
import { AuthContext } from '../context/AuthContext';

const BookingForm = ({ flight, onBook, onBack }) => {
  const { addBooking } = useContext(BookingContext);
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: currentUser ? currentUser.name.split(' ')[0] : '',
    lastName: currentUser && currentUser.name.split(' ').length > 1 ? currentUser.name.split(' ')[1] : '',
    email: currentUser ? currentUser.email : '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedClassDetails = flight.classes[flight.selectedClass];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.cardNumber) {
      alert("Please fill in required fields to complete booking.");
      return;
    }

    if (!currentUser) {
      alert("Please Sign In to complete your booking.");
      return;
    }

    // Pass data forward
    const bookingDetails = {
      passengerDetails: formData,
      flightDetails: {
        ...flight,
        pricePaid: selectedClassDetails.price + 45 // include fees
      }
    };
    
    // Save to global context/localStorage
    const savedBooking = addBooking(bookingDetails);

    onBook(savedBooking); // Use the saved booking with ID
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Change Flight</span>
        </button>
        <h2 className="text-gradient">Complete Your Booking</h2>
      </div>

      <div className="booking-layout">
        <div className="booking-form-wrapper glass-panel animate-slide-up">
          <form onSubmit={handleSubmit} className="booking-form">
            
            {!currentUser && (
               <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  You must be Logged In to book a flight.
               </div>
            )}

            {/* Passenger Info Section */}
            <div className="form-section">
              <h3><User size={20} /> Passenger Information</h3>
              <div className="form-row">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" required onChange={handleChange} value={formData.firstName} placeholder="John" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" required onChange={handleChange} value={formData.lastName} placeholder="Doe" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" size={18} />
                    <input type="email" name="email" required onChange={handleChange} value={formData.email} placeholder="john@example.com" />
                  </div>
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" size={18} />
                    <input type="tel" name="phone" onChange={handleChange} value={formData.phone} placeholder="+1 234 567 890" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="form-section payment-section">
              <h3><CreditCard size={20} /> Payment Details</h3>
              <div className="secure-badge">
                <ShieldCheck size={16} /> <span>256-bit encrypted</span>
              </div>
              
              <div className="form-row full-width">
                <div className="input-group">
                  <label>Card Number</label>
                  <input type="text" name="cardNumber" required onChange={handleChange} value={formData.cardNumber} placeholder="0000 0000 0000 0000" maxLength="19" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input type="text" name="expiryDate" required onChange={handleChange} value={formData.expiryDate} placeholder="MM/YY" maxLength="5" />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input type="text" name="cvv" required onChange={handleChange} value={formData.cvv} placeholder="123" maxLength="4" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-booking-btn" disabled={!currentUser}>
              Confirm & Pay ${selectedClassDetails.price + 45}
            </button>
            <p className="terms-text">By clicking confirm, you agree to our Terms and Conditions and Privacy Policy.</p>
          </form>
        </div>

        {/* Flight Summary Sidebar */}
        <div className="booking-summary-wrapper animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flight-summary glass-panel">
            <h3>Flight Summary</h3>
            <div className="summary-route">
              <span className="city">{flight.from}</span>
              <span className="arrow">→</span>
              <span className="city">{flight.to}</span>
            </div>
            
            <div className="summary-details">
              <div className="detail-row">
                <span>Airline</span>
                <span className="detail-value">{flight.airline}</span>
              </div>
              <div className="detail-row">
                <span>Flight</span>
                <span className="detail-value">{flight.flightNumber}</span>
              </div>
              <div className="detail-row">
                <span>Class</span>
                <span className="detail-value" style={{textTransform: 'capitalize'}}>{flight.selectedClass}</span>
              </div>
              <div className="detail-row">
                <span>Departure</span>
                <span className="detail-value">{flight.departureTime}</span>
              </div>
              <div className="detail-row">
                <span>Duration</span>
                <span className="detail-value">{flight.duration} ({flight.stops})</span>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Base Fare</span>
                <span>${selectedClassDetails.price}</span>
              </div>
              <div className="price-row">
                <span>Taxes & Fees</span>
                <span>$45.00</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span className="text-gradient">${selectedClassDetails.price + 45}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
