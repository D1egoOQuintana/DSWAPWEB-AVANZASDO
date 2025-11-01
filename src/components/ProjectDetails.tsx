"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Project } from "@/types";
import { useApp } from "@/context/AppContext";

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [open, setOpen] = useState(false);
  const { teamMembers, tasks } = useApp();

  const projectMembers = teamMembers.filter((m) =>
    project.teamMembers.includes(m.userId)
  );

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          Ver detalles
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Categoría</p>
              <p className="text-sm capitalize">{project.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Prioridad</p>
              <Badge variant={project.priority === "urgent" ? "destructive" : "default"}>
                {project.priority}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <Badge variant="secondary">{project.status}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Progreso</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="font-semibold mb-3">Miembros del Equipo ({projectMembers.length})</h3>
            <div className="space-y-2">
              {projectMembers.length > 0 ? (
                projectMembers.map((member) => (
                  <div key={member.userId} className="flex items-center gap-3 p-2 border rounded-lg">
                    <Avatar>
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.position}</p>
                    </div>
                    <Badge variant={member.isActive ? "default" : "secondary"}>
                      {member.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No hay miembros asignados</p>
              )}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="font-semibold mb-3">Tareas del Proyecto ({projectTasks.length})</h3>
            <div className="space-y-2">
              {projectTasks.length > 0 ? (
                projectTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between p-2 border rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.description}</p>
                      <p className="text-xs text-muted-foreground">Fecha límite: {task.deadline}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{task.status}</Badge>
                      <Badge
                        variant={
                          task.priority === "Urgente"
                            ? "destructive"
                            : task.priority === "Alta"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No hay tareas creadas</p>
              )}
            </div>
          </div>

          {/* Created Date */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Creado el {project.createdAt.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
