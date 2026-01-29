
export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  location?: string;
}

export interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  timestamp: number;
}

export interface Subscriber {
  id: string;
  email: string;
  timestamp: number;
}

export interface AdminUser {
  email: string;
  token: string;
}
