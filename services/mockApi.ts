
import { Project, Client, ContactSubmission, Subscriber, AdminUser } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const STORAGE_KEYS = {
  AUTH: 'realtrust_auth'
};

const INITIAL_PROJECTS: Project[] = [
  { id: '1', name: 'Luxury Villa', description: 'Experience the pinnacle of luxury living in our premium villas located in the heart of the city.', image: 'https://picsum.photos/seed/p1/450/350', location: 'San Francisco, CA' },
  { id: '2', name: 'Modern Apartment', description: 'State of the art apartments with modern amenities and breath-taking views.', image: 'https://picsum.photos/seed/p2/450/350', location: 'New York, NY' },
  { id: '3', name: 'Cozy Cottage', description: 'The perfect weekend getaway nestled in the peaceful mountains.', image: 'https://picsum.photos/seed/p3/450/350', location: 'Aspen, CO' },
  { id: '4', name: 'Urban Studio', description: 'Minimalist living spaces designed for the modern urban professional.', image: 'https://picsum.photos/seed/p4/450/350', location: 'Austin, TX' },
  { id: '5', name: 'Penthouse Suite', description: 'Ultra-luxurious penthouses offering panoramic city skylines.', image: 'https://picsum.photos/seed/p5/450/350', location: 'Miami, FL' },
];

const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'John Doe', designation: 'CEO, TechCorp', description: 'The service was exceptional. They understood exactly what I was looking for and delivered beyond my expectations.', image: 'https://picsum.photos/seed/c1/100/100' },
  { id: '2', name: 'Jane Smith', designation: 'Lead Designer', description: 'Professionalism and attention to detail are what set this team apart. Highly recommended!', image: 'https://picsum.photos/seed/c2/100/100' },
  { id: '3', name: 'Mike Johnson', designation: 'Project Manager', description: 'A seamless experience from start to finish. The team kept me informed every step of the way.', image: 'https://picsum.photos/seed/c3/100/100' },
];

export const mockApi = {
  // Auth
  login: async (email: string, password: string): Promise<AdminUser | null> => {
    // Simple mock auth
    if (email === 'admin@realtrust.com' && password === 'admin123') {
      const user = { email, token: 'mock-jwt-token-' + Date.now() };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
      return user;
    }
    return null;
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },
  getAuth: (): AdminUser | null => {
    const data = localStorage.getItem(STORAGE_KEYS.AUTH);
    return data ? JSON.parse(data) : null;
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) return INITIAL_PROJECTS;
      return await response.json();
    } catch {
      return INITIAL_PROJECTS;
    }
  },
  addProject: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return response.json();
  },
  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return response.json();
  },
  deleteProject: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });
  },

  // Clients
  getClients: async (): Promise<Client[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`);
      if (!response.ok) return INITIAL_CLIENTS;
      return await response.json();
    } catch {
      return INITIAL_CLIENTS;
    }
  },
  addClient: async (client: Omit<Client, 'id'>): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    return response.json();
  },
  updateClient: async (id: string, client: Partial<Client>): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    return response.json();
  },
  deleteClient: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/clients/${id}`, { method: 'DELETE' });
  },

  // Contact Form
  submitContact: async (submission: Omit<ContactSubmission, 'id' | 'timestamp'>): Promise<ContactSubmission> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      // Try to parse JSON safely
      let data: any = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        // If response isn't JSON, create a fallback
        data = null;
      }

      if (!response.ok) {
        const msg = data && data.error ? data.error : `Server returned ${response.status}`;
        throw new Error(msg);
      }

      return { ...data, timestamp: Date.now() };
    } catch (err: any) {
      // Network errors surface as TypeError with message 'Failed to fetch' in browsers
      if (err instanceof TypeError || (err && err.message && err.message.toLowerCase().includes('failed to fetch'))) {
        throw new Error(`Network error: could not reach backend at ${API_BASE_URL}. (${err.message})`);
      }
      throw err;
    }
  },
  getContacts: async (): Promise<ContactSubmission[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      if (!response.ok) return [];
      const contacts = await response.json();
      return contacts.map((c: any) => ({ ...c, timestamp: new Date(c.createdAt).getTime() }));
    } catch {
      return [];
    }
  },
  deleteContact: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/contacts/${id}`, { method: 'DELETE' });
  },

  // Newsletter
  subscribe: async (email: string): Promise<Subscriber> => {
    const response = await fetch(`${API_BASE_URL}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return { ...data, timestamp: Date.now() };
  },
  getSubscribers: async (): Promise<Subscriber[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribers`);
      if (!response.ok) return [];
      const subscribers = await response.json();
      return subscribers.map((s: any) => ({ ...s, timestamp: new Date(s.subscribedAt).getTime() }));
    } catch {
      return [];
    }
  },
  deleteSubscriber: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/subscribers/${id}`, { method: 'DELETE' });
  }
};
