import React from 'react';
import { Mail, Star, ExternalLink } from 'lucide-react';
import './HomeExtras.css';

const deals = [
  { id: 1, city: 'Kyoto', country: 'Japan', price: 650, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', tag: 'Trending' },
  { id: 2, city: 'Santorini', country: 'Greece', price: 499, img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80', tag: 'Flash Sale' },
  { id: 3, city: 'Dubai', country: 'UAE', price: 550, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', tag: 'Luxury' }
];

const testimonials = [
  { id: 1, name: 'Sarah Jenkins', role: 'Frequent Flyer', text: 'AeroSpace makes booking so incredibly elegant. I never thought buying flight tickets could feel this premium.' },
  { id: 2, name: 'David Cho', role: 'Digital Nomad', text: 'The hotel selections are top-tier and the dashboard keeps my chaotic flying schedule perfectly organized.' }
];

const HomeExtras = () => {
  return (
    <div className="home-extras">
      
      {/* Deals Section */}
      <section className="deals-section">
        <h2>
          Exclusive <span className="text-gradient">Destinations</span>
        </h2>
        <div className="deals-grid">
          {deals.map(deal => (
            <div key={deal.id} className="glass-panel deal-card">
              <div className="deal-image-wrapper">
                <img src={deal.img} alt={deal.city} className="deal-image" />
                <div className="deal-tag">
                  {deal.tag}
                </div>
              </div>
              <div className="deal-content">
                <div className="deal-info">
                  <h3>{deal.city}</h3>
                  <p>{deal.country}</p>
                </div>
                <div className="deal-price">
                  <p className="from">From</p>
                  <p className="amount">${deal.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Grid for Reviews & Newsletter */}
      <div className="extras-bottom-grid">
        
        {/* Testimonials */}
        <section className="glass-panel testimonials-section">
          <h2>
            <Star color="var(--color-secondary)" /> Traveler Stories
          </h2>
          <div className="testimonials-list">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-item">
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-author">{t.name}</p>
                <p className="testimonial-role">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="glass-panel newsletter-section">
          <Mail size={48} className="newsletter-icon" />
          <h2>Never Miss a Flight Deal</h2>
          <p>Join our exclusive list for weekly updates on luxury stays and first-class tickets.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your aesthetic email..." className="newsletter-input" />
            <button className="btn btn-primary newsletter-btn">Subscribe</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomeExtras;
