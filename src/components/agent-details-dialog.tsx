
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Agent } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

interface AgentDetailsDialogProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

const getImage = (avatarId: string) => {
  return PlaceHolderImages.find((img) => img.id === avatarId);
};

// Simulamos una lista de proyectos que podría venir de una API.
// Para probar el caso sin proyectos, cambia esto a: const projects: string[] = [];
const projects: string[] = ['Proyecto Alpha', 'Proyecto Beta'];

export default function AgentDetailsDialog({
  agent,
  isOpen,
  onClose,
}: AgentDetailsDialogProps) {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [showValidation, setShowValidation] = useState(false);
  const avatar = getImage(agent.avatarId);
  const hasProjects = projects.length > 0;

  const handleConfirm = () => {
    if (!selectedProject) {
      setShowValidation(true);
      return;
    }

    toast({
      title: '¡Conexión Exitosa!',
      description: `${agent.name} ha sido conectado a ${selectedProject}.`,
    });
    onClose();
  };
  
  const handleSelectChange = (value: string) => {
    setSelectedProject(value);
    if (showValidation) {
      setShowValidation(false);
    }
  }

  const handleCreateProject = () => {
    // Aquí iría la lógica para crear un nuevo proyecto.
    // Por ahora, simplemente cerramos el diálogo.
    toast({
      title: 'Próximamente',
      description: 'La funcionalidad para crear proyectos estará disponible pronto.',
    });
    onClose();
  }

  const descriptionPoints = agent.longDescription.split(';').filter(p => p.trim() !== '');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-muted">
        <DialogHeader className="items-center text-center">
          <Avatar className="w-28 h-28 mb-4">
            <AvatarImage
              src={avatar?.imageUrl}
              alt={avatar?.description}
              data-ai-hint={avatar?.imageHint}
              className="aspect-square object-cover"
            />
            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
          <DialogDescription>{agent.specialty}</DialogDescription>
        </DialogHeader>

        <div className="py-4 px-1 text-sm text-muted-foreground text-left">
           <ul className="space-y-2 list-disc list-inside">
              {descriptionPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
        </div>
        
        <Separator className="my-4" />

        {hasProjects ? (
          <>
            <div className="grid grid-cols-1 items-center gap-4">
              <p className="text-sm text-center text-muted-foreground">Selecciona un proyecto para conectar el agente.</p>
              <Select 
                onValueChange={handleSelectChange} 
                value={selectedProject}
              >
                <SelectTrigger className={cn(showValidation && 'ring-2 ring-destructive')}>
                  <SelectValue 
                    placeholder={
                      showValidation ? "Selecciona primero un proyecto, por favor" : "Selecciona un proyecto"
                    } 
                  />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                     <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>Confirmar Conexión</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="text-center space-y-4">
               <p className="text-sm text-muted-foreground">Para conectar este agente, primero necesitas crear un proyecto.</p>
               <Button onClick={handleCreateProject}>Crear mi primer proyecto</Button>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={onClose} className="w-full">
                Volver
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
