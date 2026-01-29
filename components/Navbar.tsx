
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-primary flex items-center">
              <span className="text-accent mr-2 italic">Real</span>Trust
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleScroll(link.id)}
                className="text-gray-600 hover:text-accent font-medium transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <button onClick={handleContactClick} className="bg-accent text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition-all shadow-md">
              Contact Us
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleScroll(link.id)}
              className="block w-full text-left text-gray-600 hover:text-accent font-medium py-2 border-b border-gray-50"
            >
              {link.name}
            </button>
          ))}
          <button onClick={handleContactClick} className="w-full bg-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 shadow-md">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
