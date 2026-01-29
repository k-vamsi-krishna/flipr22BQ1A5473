
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectSection from '../components/ProjectSection';
import ClientSection from '../components/ClientSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section id="home">
          <Hero />
        </section>
        
        {/* Features / Why Choose Us */}
        <section id="services" className="py-24 bg-white relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-3xl font-extrabold text-primary mb-4">Why Choose Us?</h2>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Potential ROI</h3>
              <p className="text-gray-500 text-sm">We provide insights that help you maximize your real estate investment returns.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Design</h3>
              <p className="text-gray-500 text-sm">State-of-the-art design services that turn houses into dream homes.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Marketing</h3>
              <p className="text-gray-500 text-sm">High-impact marketing strategies to sell your property at top dollar.</p>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-gray-50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <img src="https://picsum.photos/seed/about/800/600" alt="About Team" className="rounded-3xl shadow-2xl" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-8 leading-tight">About Us</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                With over 15 years of experience in the luxury real estate market, we pride ourselves on delivering exceptional value to our clients. Our approach combines data-driven marketing with world-class interior design.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div> Premium Property Listings
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div> Expert Market Analysis
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div> Professional Staging Services
                </li>
              </ul>
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section id="projects">
          <ProjectSection />
        </section>
        <section id="testimonials">
          <ClientSection />
        </section>
        <section id="contact">
          <Newsletter />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
