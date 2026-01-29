
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { mockApi } from '../services/mockApi';
import { Project, Client, ContactSubmission, Subscriber, AdminUser } from '../types';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Mail, 
  Bell, 
  Plus, 
  LogOut, 
  Menu, 
  X,
  Upload,
  Calendar,
  Trash2,
  AlertCircle
} from 'lucide-react';
import ImageCropper from '../components/ImageCropper';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    mockApi.logout();
    onLogout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Clients', path: '/admin/clients', icon: Users },
    { name: 'Form Submissions', path: '/admin/submissions', icon: Mail },
    { name: 'Subscribers', path: '/admin/subscribers', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <span className="text-xl font-bold text-white"><span className="text-accent italic">Real</span>Trust Admin</span>
            <button className="lg:hidden text-white" onClick={() => setIsSidebarOpen(false)}><X /></button>
          </div>

          <nav className="flex-grow space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === item.path ? 'bg-accent text-white font-bold' : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <button className="lg:hidden text-gray-600" onClick={() => setIsSidebarOpen(true)}><Menu /></button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Logged in as</span>
            <span className="text-sm font-bold text-primary">{user.email}</span>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<SummaryView />} />
            <Route path="/projects" element={<ProjectsManager />} />
            <Route path="/clients" element={<ClientsManager />} />
            <Route path="/submissions" element={<SubmissionsList />} />
            <Route path="/subscribers" element={<SubscribersList />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Sub-components for Dashboard
const SummaryView = () => {
  const [stats, setStats] = useState({ projects: 0, clients: 0, submissions: 0, subscribers: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const [projects, clients, submissions, subscribers] = await Promise.all([
        mockApi.getProjects(),
        mockApi.getClients(),
        mockApi.getContacts(),
        mockApi.getSubscribers()
      ]);
      setStats({
        projects: projects.length,
        clients: clients.length,
        submissions: submissions.length,
        subscribers: subscribers.length
      });
    };
    loadStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value={stats.projects.toString()} change="From database" color="bg-blue-500" />
        <StatCard title="Happy Clients" value={stats.clients.toString()} change="From database" color="bg-green-500" />
        <StatCard title="Submissions" value={stats.submissions.toString()} change="From database" color="bg-purple-500" />
        <StatCard title="Subscribers" value={stats.subscribers.toString()} change="From database" color="bg-orange-500" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className={`w-12 h-12 ${color} text-white rounded-xl flex items-center justify-center mb-4`}>
      <Briefcase size={24} />
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <div className="text-3xl font-extrabold text-primary mt-1">{value}</div>
    <div className="text-xs text-green-500 font-semibold mt-2">{change}</div>
  </div>
);

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '', image: '', location: '' });
  const [croppingImage, setCroppingImage] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await mockApi.getProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCroppingImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedImage: string) => {
    setFormData({ ...formData, image: croppedImage });
    setCroppingImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return alert('Please upload and crop an image first.');
    await mockApi.addProject(formData);
    setIsAdding(false);
    setFormData({ name: '', description: '', image: '', location: '' });
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await mockApi.deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="space-y-8">
      {croppingImage && (
        <ImageCropper 
          image={croppingImage} 
          onCropComplete={onCropComplete} 
          onCancel={() => setCroppingImage(null)} 
        />
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Project Management</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-accent text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
        >
          <Plus size={20} /> Add New Project
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-accent/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-bold mb-6">Add New Project</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent"
                placeholder="Project Name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent"
                placeholder="Location (e.g., San Francisco, CA)"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
              <textarea 
                required
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent"
                placeholder="Project Description"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-3xl h-full min-h-[200px] flex flex-col items-center justify-center p-6 text-center hover:border-accent transition-colors">
                {formData.image ? (
                  <div className="relative w-full h-full">
                    <img src={formData.image} className="w-full h-full object-cover rounded-2xl" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, image: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"
                    ><X size={16} /></button>
                  </div>
                ) : (
                  <>
                    <Upload className="text-gray-400 mb-4" size={48} />
                    <p className="text-sm text-gray-500 mb-4">Upload an image to crop to 450x350</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      id="project-img-upload" 
                      onChange={handleFileChange} 
                    />
                    <label 
                      htmlFor="project-img-upload" 
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold cursor-pointer"
                    >Select Image</label>
                  </>
                )}
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex gap-4 pt-4 border-t border-gray-100">
              <button 
                type="submit"
                className="bg-accent text-white px-10 py-3 rounded-xl font-bold shadow-lg"
              >Save Project</button>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="bg-gray-100 text-gray-600 px-10 py-3 rounded-xl font-bold"
              >Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-1">{p.name}</h4>
                <p className="text-accent text-xs font-semibold mb-4">{p.location}</p>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{p.description}</p>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ClientsManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', designation: '', description: '', image: '' });
  const [croppingImage, setCroppingImage] = useState<string | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    const data = await mockApi.getClients();
    setClients(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCroppingImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedImage: string) => {
    setFormData({ ...formData, image: croppedImage });
    setCroppingImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mockApi.addClient(formData);
    setIsAdding(false);
    setFormData({ name: '', designation: '', description: '', image: '' });
    loadClients();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      await mockApi.deleteClient(id);
      loadClients();
    }
  };

  return (
    <div className="space-y-8">
      {croppingImage && (
        <ImageCropper 
          image={croppingImage} 
          onCropComplete={onCropComplete} 
          onCancel={() => setCroppingImage(null)} 
        />
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Client Management</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-accent text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
        >
          <Plus size={20} /> Add New Client
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-accent/20">
          <h3 className="text-xl font-bold mb-6">Add Client Info</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent"
                placeholder="Client Name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <select 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent"
                value={formData.designation}
                onChange={e => setFormData({...formData, designation: e.target.value})}
              >
                <option value="">Select Designation</option>
                <option value="CEO">CEO</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Investor">Investor</option>
              </select>
              <textarea 
                required
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent"
                placeholder="Client Feedback/Description"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-3xl h-full min-h-[200px] flex flex-col items-center justify-center p-6 text-center">
                 {formData.image ? (
                  <div className="relative w-24 h-24">
                    <img src={formData.image} className="w-full h-full object-cover rounded-full border-2 border-accent" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, image: ''})}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                    ><X size={14} /></button>
                  </div>
                ) : (
                  <>
                    <Upload className="text-gray-400 mb-2" size={32} />
                    <p className="text-xs text-gray-500 mb-4">Client Portrait</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      id="client-img-upload" 
                      onChange={handleFileChange} 
                    />
                    <label 
                      htmlFor="client-img-upload" 
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
                    >Upload</label>
                  </>
                )}
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex gap-4 pt-4 border-t border-gray-100">
              <button 
                type="submit"
                className="bg-accent text-white px-10 py-3 rounded-xl font-bold shadow-lg"
              >Save Client</button>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="bg-gray-100 text-gray-600 px-10 py-3 rounded-xl font-bold"
              >Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading clients...</div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center text-gray-400 italic">No clients yet.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-8 py-4">Client</th>
                <th className="px-8 py-4">Designation</th>
                <th className="px-8 py-4">Testimonial</th>
                <th className="px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={c.image} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-bold text-primary">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-600">{c.designation}</td>
                  <td className="px-8 py-6 text-sm text-gray-500 italic max-w-md">"{c.description}"</td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => handleDelete(c.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    const data = await mockApi.getContacts();
    setSubmissions(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      await mockApi.deleteContact(id);
      loadSubmissions();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-primary">Contact Form Submissions</h2>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="p-12 text-center text-gray-400 italic">No submissions yet.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-8 py-5">Full Name</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Mobile</th>
                <th className="px-8 py-5">City</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 font-bold text-primary">{s.fullName}</td>
                  <td className="px-8 py-5 text-gray-600">{s.email}</td>
                  <td className="px-8 py-5 text-gray-600">{s.mobile}</td>
                  <td className="px-8 py-5 text-gray-600">{s.city}</td>
                  <td className="px-8 py-5 text-gray-400 text-sm flex items-center gap-2">
                    <Calendar size={14} /> {new Date(s.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">
                    <button 
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    setLoading(true);
    const data = await mockApi.getSubscribers();
    setSubscribers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to unsubscribe this email?')) {
      await mockApi.deleteSubscriber(id);
      loadSubscribers();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-primary">Newsletter Subscribers</h2>
      <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center text-gray-400 italic">No subscribers yet.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-8 py-5">Email Address</th>
                <th className="px-8 py-5">Subscribed Date</th>
                <th className="px-8 py-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 font-medium text-primary">{s.email}</td>
                  <td className="px-8 py-5 text-gray-400 text-sm">{new Date(s.timestamp).toLocaleDateString()}</td>
                  <td className="px-8 py-5">
                    <button 
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
