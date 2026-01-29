
import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { Project } from '../types';

const ProjectSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">Our Projects</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We know what buyers are looking for and suggest projects that will bring clients top dollar for the sale of their homes.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">{project.name}</h3>
                  <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">{project.location || 'Consultation'}</p>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <button className="bg-accent text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 shadow-md transition-colors w-full">
                    READ MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
