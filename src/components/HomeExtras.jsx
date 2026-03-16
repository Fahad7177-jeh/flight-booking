import React from 'react';
import { Mail, Star, ExternalLink } from 'lucide-react';

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
    <div className="home-extras" style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      
      {/* Deals Section */}
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Exclusive <span className="text-gradient">Destinations</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {deals.map(deal => (
            <div key={deal.id} className="glass-panel" style={{ overflow: 'hidden', padding: 0, cursor: 'pointer', transition: 'transform 0.3s' }} 
                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'relative', height: '240px' }}>
                <img src={deal.img} alt={deal.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {deal.tag}
                </div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{deal.city}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{deal.country}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>From</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>${deal.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Grid for Reviews & Newsletter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
        
        {/* Testimonials */}
        <section className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star color="var(--color-secondary)" /> Traveler Stories
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.id} style={{ borderLeft: '3px solid var(--color-primary)', paddingLeft: '1.5rem' }}>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>"{t.text}"</p>
                <p style={{ fontWeight: 700 }}>{t.name}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="glass-panel" style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'var(--gradient-card)' }}>
          <Mail size={48} color="var(--color-primary)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Never Miss a Flight Deal</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '300px' }}>Join our exclusive list for weekly updates on luxury stays and first-class tickets.</p>
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
            <input type="email" placeholder="Your aesthetic email..." style={{ flex: 1, height: '3.5rem', borderRadius: '30px' }} />
            <button className="btn btn-primary" style={{ borderRadius: '30px', padding: '0 1.5rem' }}>Subscribe</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomeExtras;
