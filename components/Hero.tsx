
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../services/mockApi';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', mobile: '', city: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Validate phone number - must be at least 10 digits
  const validatePhoneNumber = (phone: string): boolean => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    if (!validatePhoneNumber(formData.mobile)) {
      setError('Phone number must be at least 10 digits');
      return;
    }

    setIsSubmitting(true);
    try {
      await mockApi.submitContact(formData);
      setSuccess(true);
      setFormData({ fullName: '', email: '', mobile: '', city: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/realestate/1920/1080" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Consultation,<br />
            <span className="text-accent underline decoration-4 underline-offset-8">Design</span> & Marketing
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
            Leading the way in premium real estate services. We provide comprehensive solutions tailored to your unique needs and lifestyle.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="bg-accent hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transition-all">
              See Projects
            </button>
            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Lead Form */}
        <div className="lg:w-1/3 w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-bold text-white text-center mb-6">Get a Free Consultation</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              required
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
            <input 
              required
              type="email" 
              placeholder="Enter Email Address" 
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <div>
              <input 
                required
                type="tel" 
                placeholder="Mobile Number (minimum 10 digits)" 
                className={`w-full bg-white/10 border rounded-lg p-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all ${
                  error.includes('Phone') ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-accent'
                }`}
                value={formData.mobile}
                onChange={e => {
                  setFormData({...formData, mobile: e.target.value});
                  setError('');
                }}
              />
              {error.includes('Phone') && <p className="text-red-400 text-sm mt-1">{error}</p>}
            </div>
            <input 
              required
              type="text" 
              placeholder="Area, City" 
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.city}
              onChange={e => setFormData({...formData, city: e.target.value})}
            />
            <button 
              disabled={isSubmitting || error.includes('Phone')}
              className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-lg shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Get Quick Quote'}
            </button>
            {success && <p className="text-green-400 text-center font-medium mt-2">Request sent successfully!</p>}
            {error && !error.includes('Phone') && <p className="text-red-400 text-center font-medium mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
