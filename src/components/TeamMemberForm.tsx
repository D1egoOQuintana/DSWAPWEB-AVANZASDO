"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/context/AppContext";
import { TeamMember } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TeamMemberFormProps {
  member?: TeamMember;
  onClose?: () => void;
}

export function TeamMemberForm({ member, onClose }: TeamMemberFormProps) {
  const { addTeamMember, updateTeamMember, projects } = useApp();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [birthdate, setBirthdate] = useState<Date | undefined>(
    member?.birthdate ? new Date(member.birthdate) : undefined
  );

  const [formData, setFormData] = useState<Partial<TeamMember>>(
    member || {
      userId: "",
      role: "",
      name: "",
      email: "",
      position: "",
      birthdate: "",
      phone: "",
      projectId: null,
      isActive: true,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.position || !formData.role) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email!)) {
      setError("Por favor ingresa un email válido");
      return;
    }

    // Simulate API call
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (member) {
      // Update existing member
      updateTeamMember(member.userId, {
        ...formData,
        birthdate: birthdate ? format(birthdate, "yyyy-MM-dd") : formData.birthdate,
      });
    } else {
      // Create new member
      const newMember: TeamMember = {
        userId: Date.now().toString(),
        role: formData.role!,
        name: formData.name!,
        email: formData.email!,
        position: formData.position!,
        birthdate: birthdate ? format(birthdate, "yyyy-MM-dd") : "",
        phone: formData.phone || "",
        projectId: formData.projectId || null,
        isActive: formData.isActive ?? true,
      };
      addTeamMember(newMember);
    }

    setLoading(false);
    setOpen(false);
    if (onClose) onClose();
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {member ? (
          <Button size="sm" variant="outline">
            Editar
          </Button>
        ) : (
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
            Nuevo Miembro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{member ? "Editar Miembro" : "Agregar Nuevo Miembro"}</DialogTitle>
            <DialogDescription>
              Completa la información del miembro del equipo. Los campos con * son obligatorios.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nombre Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
                placeholder="Juan Pérez"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
                placeholder="juan@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="position">
                  Cargo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  disabled={loading}
                  placeholder="Frontend Developer"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">
                  Rol <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={loading}
                  placeholder="+1234567890"
                />
              </div>

              <div className="grid gap-2">
                <Label>Fecha de Nacimiento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                      disabled={loading}
                    >
                      {birthdate ? (
                        format(birthdate, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={birthdate}
                      onSelect={setBirthdate}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="projectId">Proyecto Asignado</Label>
              <Select
                value={formData.projectId || "none"}
                onValueChange={(value) =>
                  setFormData({ ...formData, projectId: value === "none" ? null : value })
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sin proyecto asignado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin proyecto asignado</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="isActive">Estado Activo</Label>
                <p className="text-sm text-muted-foreground">
                  El miembro está activo y disponible para asignaciones
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  {member ? "Actualizando..." : "Creando..."}
                </>
              ) : member ? (
                "Actualizar"
              ) : (
                "Crear Miembro"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
