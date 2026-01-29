
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-extrabold text-white flex items-center mb-6">
              <span className="text-accent mr-2 italic">Real</span>Trust
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Premium real estate and consultation services. We help you find, design, and market the perfect property.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Real Estate Sales</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Interior Design</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Marketing Strategy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Consultation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li>123 Luxury Avenue, Suite 456</li>
              <li>Beverly Hills, CA 90210</li>
              <li>Email: contact@realtrust.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-xs">
          <p>© {new Date().getFullYear()} RealTrust. All rights reserved. <Link to="/admin/login" className="hover:underline">Admin Login</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
