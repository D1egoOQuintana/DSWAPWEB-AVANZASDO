"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Project, TeamMember, Task, Settings } from "@/types";

interface AppContextType {
  projects: Project[];
  teamMembers: TeamMember[];
  tasks: Task[];
  settings: Settings;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (userId: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (userId: string) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial data
const initialProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Plataforma de comercio electrónico con Next.js",
    category: "web",
    priority: "high",
    status: "En progreso",
    progress: 65,
    teamMembers: ["1", "2"],
    createdAt: new Date("2025-10-01"),
  },
  {
    id: "2",
    name: "Mobile App",
    description: "Aplicación móvil con React Native",
    category: "mobile",
    priority: "high",
    status: "En revisión",
    progress: 90,
    teamMembers: ["3"],
    createdAt: new Date("2025-10-05"),
  },
  {
    id: "3",
    name: "Dashboard Analytics",
    description: "Panel de análisis con visualizaciones",
    category: "web",
    priority: "medium",
    status: "Planificado",
    progress: 20,
    teamMembers: ["4"],
    createdAt: new Date("2025-10-10"),
  },
];

const initialTeamMembers: TeamMember[] = [
  {
    userId: "1",
    role: "Developer",
    name: "María García",
    email: "maria@example.com",
    position: "Frontend Developer",
    birthdate: "1995-03-15",
    phone: "+1234567890",
    projectId: "1",
    isActive: true,
  },
  {
    userId: "2",
    role: "Developer",
    name: "Juan Pérez",
    email: "juan@example.com",
    position: "Backend Developer",
    birthdate: "1992-07-22",
    phone: "+1234567891",
    projectId: "1",
    isActive: true,
  },
  {
    userId: "3",
    role: "Designer",
    name: "Ana López",
    email: "ana@example.com",
    position: "UI/UX Designer",
    birthdate: "1998-11-08",
    phone: "+1234567892",
    projectId: "2",
    isActive: false,
  },
  {
    userId: "4",
    role: "DevOps",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    position: "DevOps Engineer",
    birthdate: "1990-05-18",
    phone: "+1234567893",
    projectId: "3",
    isActive: true,
  },
  {
    userId: "5",
    role: "Manager",
    name: "Laura Martínez",
    email: "laura@example.com",
    position: "Project Manager",
    birthdate: "1988-09-25",
    phone: "+1234567894",
    projectId: null,
    isActive: true,
  },
];

const initialTasks: Task[] = [
  {
    id: "1",
    description: "Implementar autenticación",
    projectId: "1",
    status: "En progreso",
    priority: "Alta",
    userId: "1",
    deadline: "2025-11-15",
    createdAt: new Date("2025-11-01"),
  },
  {
    id: "2",
    description: "Diseñar pantalla de perfil",
    projectId: "2",
    status: "Pendiente",
    priority: "Media",
    userId: "3",
    deadline: "2025-11-20",
    createdAt: new Date("2025-11-01"),
  },
  {
    id: "3",
    description: "Configurar CI/CD",
    projectId: "3",
    status: "Completado",
    priority: "Alta",
    userId: "4",
    deadline: "2025-11-10",
    createdAt: new Date("2025-10-28"),
  },
  {
    id: "4",
    description: "Optimizar queries SQL",
    projectId: "1",
    status: "En progreso",
    priority: "Urgente",
    userId: "2",
    deadline: "2025-11-12",
    createdAt: new Date("2025-11-01"),
  },
  {
    id: "5",
    description: "Documentar API endpoints",
    projectId: "3",
    status: "Pendiente",
    priority: "Baja",
    userId: "5",
    deadline: "2025-11-25",
    createdAt: new Date("2025-11-01"),
  },
];

const initialSettings: Settings = {
  siteName: "Dashboard de Proyectos",
  language: "es",
  timezone: "America/Lima",
  emailNotifications: true,
  pushNotifications: false,
  theme: "light",
  autoSave: true,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    // Also remove tasks related to this project
    setTasks(tasks.filter((t) => t.projectId !== id));
  };

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers([...teamMembers, member]);
  };

  const updateTeamMember = (userId: string, updatedMember: Partial<TeamMember>) => {
    setTeamMembers(teamMembers.map((m) => (m.userId === userId ? { ...m, ...updatedMember } : m)));
  };

  const deleteTeamMember = (userId: string) => {
    setTeamMembers(teamMembers.filter((m) => m.userId !== userId));
    // Unassign tasks from this member
    setTasks(tasks.map((t) => (t.userId === userId ? { ...t, userId: "" } : t)));
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateSettings = (updatedSettings: Partial<Settings>) => {
    setSettings({ ...settings, ...updatedSettings });
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        teamMembers,
        tasks,
        settings,
        addProject,
        updateProject,
        deleteProject,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTask,
        updateTask,
        deleteTask,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
