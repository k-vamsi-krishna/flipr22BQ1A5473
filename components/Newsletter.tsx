
import React, { useState } from 'react';
import { mockApi } from '../services/mockApi';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await mockApi.subscribe(email);
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
          <p className="text-blue-200">Get the latest updates on new properties and exclusive offers.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-4">
          <input 
            required
            type="email" 
            placeholder="Enter Email Address" 
            className="flex-grow md:w-80 px-4 py-3 rounded-lg focus:ring-2 focus:ring-accent outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button 
            disabled={status !== 'idle'}
            className="bg-accent hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
