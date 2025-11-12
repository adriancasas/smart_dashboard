'use client';
import { useSearchParams } from 'next/navigation';
import { Agent } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const allAgents: Agent[] = [
    {
      id: '1',
      name: 'Data Miner',
      specialty: 'Especialista en extracción y análisis de datos a gran escala.',
      longDescription:
        'Extrae y analiza patrones complejos de grandes conjuntos de datos.;Ideal para inteligencia de mercado, investigación científica y análisis predictivo.;Se integra con las principales bases de datos y plataformas de data warehousing.;100% conectable con el resto de agents',
      avatarId: 'agent1',
    },
    {
      id: '2',
      name: 'Web Crawler',
      specialty: 'Navega y extrae información de sitios web de forma automatizada.',
      longDescription:
        'Recopila información específica de la web de forma autónoma.;Perfecto para monitoreo de precios, generación de leads o agregación de noticias.;Respeta los ficheros robots.txt y gestiona las sesiones de forma eficiente.;100% conectable con el resto de agents',
      avatarId: 'agent2',
    },
    {
      id: '3',
      name: 'Content Analyst',
      specialty: 'Analiza y resume grandes volúmenes de texto y contenido.',
      longDescription:
        'Procesa y comprende grandes cantidades de texto.;Extrae resúmenes, identifica sentimientos y clasifica temas.;Ideal para analizar opiniones de clientes, informes de mercado o documentación interna.;100% conectable con el resto de agents',
      avatarId: 'agent3',
    },
    {
      id: '4',
      name: 'Code Generator',
      specialty:
        'Genera fragmentos de código en múltiples lenguajes de programación.',
      longDescription:
        'Genera boilerplate, funciones y clases a partir de descripciones en lenguaje natural.;Soporta Python, JavaScript, Java y más.;Reduce el tiempo de desarrollo y minimiza errores.;100% conectable con el resto de agents',
      avatarId: 'agent4',
    },
    {
      id: '5',
      name: 'Support Bot',
      specialty: 'Asistente virtual para soporte al cliente 24/7.',
      longDescription:
        'Ofrece respuestas instantáneas y precisas a las preguntas frecuentes.;Se integra con tu base de conocimientos para una experiencia coherente.;Mejora la satisfacción del cliente con disponibilidad 24/7.;100% conectable con el resto de agents',
      avatarId: 'agent5',
    },
    {
      id: '6',
      name: 'Marketplace Analyzer',
      specialty: 'Analiza tendencias de mercado y precios de la competencia.',
      longDescription:
        'Monitorea mercados online para identificar tendencias emergentes.;Analiza estrategias de precios de la competencia.;Encuentra nuevas oportunidades de negocio para e-commerce.;100% conectable con el resto de agents',
      avatarId: 'agent6',
    },
    {
      id: '7',
      name: 'Image Generator',
      specialty: 'Crea imágenes y arte visual a partir de descripciones textuales.',
      longDescription:
        'Transforma ideas en imágenes de alta calidad usando modelos de difusión.;Crea desde logos y prototipos hasta obras de arte complejas.;Fácil de usar con descripciones en texto simple.;100% conectable con el resto de agents',
      avatarId: 'agent7',
    },
    {
      id: '8',
      name: 'Social Media Manager',
      specialty:
        'Automatiza publicaciones y analiza el engagement en redes sociales.',
      longDescription:
        'Planifica y automatiza publicaciones en múltiples plataformas.;Analiza el rendimiento del contenido y mide el engagement.;Ofrece insights para optimizar tu estrategia en redes sociales.;100% conectable con el resto de agents',
      avatarId: 'agent8',
    },
  ];

const getImage = (avatarId: string) => {
    return PlaceHolderImages.find((img) => img.id === avatarId);
};
  
const projects = ['Proyecto Alpha', 'Proyecto Beta'];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const agentId = searchParams.get('agentId');
  const agent = allAgents.find((a) => a.id === agentId);
  const avatar = agent ? getImage(agent.avatarId) : null;

  const handleConnect = () => {
    if (!selectedProject) {
        toast({
            title: 'Error',
            description: 'Por favor, selecciona un proyecto.',
            variant: 'destructive',
          });
      return;
    }
    toast({
      title: '¡Conectado!',
      description: `El agente ${agent?.name} se ha conectado a ${selectedProject}.`,
    });
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      {agent ? (
        <Card className="max-w-2xl mx-auto">
            <CardHeader className='items-center text-center'>
                <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage 
                        src={avatar?.imageUrl}
                        alt={avatar?.description}
                        data-ai-hint={avatar?.imageHint}
                        className="aspect-square object-cover"
                    />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">{agent.name}</CardTitle>
                <CardDescription>{agent.specialty}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-muted-foreground text-center">Selecciona un proyecto para conectar tu agente.</p>
                    <Select onValueChange={setSelectedProject}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects.map((project) => (
                                <SelectItem key={project} value={project}>
                                    {project}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button className='w-full' onClick={handleConnect}>
                        Conectar a proyecto
                    </Button>
                </div>
            </CardContent>
        </Card>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Mi Dashboard
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Bienvenido. Aquí podrás gestionar tus proyectos y los agentes
            conectados.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Selecciona un agente de la Store para empezar.</p>
        </div>
      )}
    </main>
  );
}
