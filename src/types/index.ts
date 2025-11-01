// Types for the application

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  progress: number;
  teamMembers: string[]; // Array of user IDs
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  role: string;
  name: string;
  email: string;
  position: string;
  birthdate: string;
  phone: string;
  projectId: string | null;
  isActive: boolean;
}

export interface Task {
  id: string;
  description: string;
  projectId: string;
  status: string;
  priority: string;
  userId: string;
  deadline: string;
  createdAt: Date;
}

export interface Settings {
  siteName: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: string;
  autoSave: boolean;
}
