
import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { Client } from '../types';

const ClientSection: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    mockApi.getClients().then(setClients);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">Happy Clients</h2>
          <p className="text-gray-500 max-w-2xl mx-auto italic font-medium">
            Hear from those who found their dream homes and premium investments with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clients.map((client) => (
            <div key={client.id} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-accent/20 mb-6 group-hover:border-accent transition-colors">
                <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                "{client.description}"
              </p>
              <div>
                <h4 className="font-bold text-primary text-lg">{client.name}</h4>
                <p className="text-accent text-xs font-semibold uppercase">{client.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
