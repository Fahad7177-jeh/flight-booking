import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '4rem 2rem',
      background: 'rgba(0,0,0,0.5)',
      marginTop: 'auto',
      borderTop: '1px solid var(--color-border)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Aero<span className="text-gradient">Space</span>
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Premium travel experiences curated for the modern explorer. Fly higher, sleep better, explore further.
          </p>
        </div>
        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem', fontWeight: 600 }}>Explore</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="#" style={{ color: 'inherit' }}>Flights</a></li>
            <li><a href="#" style={{ color: 'inherit' }}>Hotels</a></li>
            <li><a href="#" style={{ color: 'inherit' }}>Deals & Promos</a></li>
          </ul>
        </div>
        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem', fontWeight: 600 }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="#" style={{ color: 'inherit' }}>Help Center</a></li>
            <li><a href="#" style={{ color: 'inherit' }}>Contact Us</a></li>
            <li><a href="#" style={{ color: 'inherit' }}>Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} AeroSpace Travel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
