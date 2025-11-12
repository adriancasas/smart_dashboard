
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

interface AgentDetailsDialogProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

const getImage = (avatarId: string) => {
  return PlaceHolderImages.find((img) => img.id === avatarId);
};

export default function AgentDetailsDialog({
  agent,
  isOpen,
  onClose,
}: AgentDetailsDialogProps) {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const avatar = getImage(agent.avatarId);

  const handleConfirm = () => {
    if (!selectedProject) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, selecciona un proyecto.',
      });
      return;
    }

    toast({
      title: '¡Conexión Exitosa!',
      description: `${agent.name} ha sido conectado a ${selectedProject}.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
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
          <p>{agent.longDescription}</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-4">
          <Select onValueChange={setSelectedProject} value={selectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un proyecto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Proyecto Alpha">Proyecto Alpha</SelectItem>
              <SelectItem value="Proyecto Beta">Proyecto Beta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar Conexión</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
