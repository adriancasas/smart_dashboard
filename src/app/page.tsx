'use client';

import { useState, useEffect, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Chatbot from '@/components/chatbot';
import { Loader2 } from 'lucide-react';
import AgentDetailsDialog from '@/components/agent-details-dialog';
import { Agent } from '@/lib/types';

const allAgents: Agent[] = [
  {
    id: '1',
    name: 'Data Miner',
    specialty: 'Especialista en extracción y análisis de datos a gran escala.',
    longDescription:
      'Data Miner es un agente de IA avanzado diseñado para extraer y analizar patrones complejos de grandes conjuntos de datos. Es ideal para inteligencia de mercado, investigación científica y análisis predictivo. Se integra con las principales bases de datos y plataformas de data warehousing.',
    avatarId: 'agent1',
  },
  {
    id: '2',
    name: 'Web Crawler',
    specialty: 'Navega y extrae información de sitios web de forma automatizada.',
    longDescription:
      'Web Crawler navega por la web de forma autónoma para recopilar información específica según tus criterios. Perfecto para monitoreo de precios, generación de leads o agregación de noticias. Respeta los ficheros robots.txt y gestiona las sesiones de forma eficiente.',
    avatarId: 'agent2',
  },
  {
    id: '3',
    name: 'Content Analyst',
    specialty: 'Analiza y resume grandes volúmenes de texto y contenido.',
    longDescription:
      'Content Analyst procesa y comprende grandes cantidades de texto para extraer resúmenes, identificar sentimientos y clasificar temas. Es la herramienta perfecta para analizar opiniones de clientes, informes de mercado o documentación interna.',
    avatarId: 'agent3',
  },
  {
    id: '4',
    name: 'Code Generator',
    specialty:
      'Genera fragmentos de código en múltiples lenguajes de programación.',
    longDescription:
      'Code Generator acelera el desarrollo de software generando boilerplate, funciones y clases en lenguajes como Python, JavaScript y Java a partir de descripciones en lenguaje natural. Reduce el tiempo de desarrollo y minimiza errores.',
    avatarId: 'agent4',
  },
  {
    id: '5',
    name: 'Support Bot',
    specialty: 'Asistente virtual para soporte al cliente 24/7.',
    longDescription:
      'Support Bot ofrece respuestas instantáneas y precisas a las preguntas frecuentes de los clientes. Se integra con tu base de conocimientos para ofrecer una experiencia de soporte coherente y está disponible 24/7 para mejorar la satisfacción del cliente.',
    avatarId: 'agent5',
  },
  {
    id: '6',
    name: 'Marketplace Analyzer',
    specialty: 'Analiza tendencias de mercado y precios de la competencia.',
    longDescription:
      'Marketplace Analyzer monitorea constantemente los mercados online para identificar tendencias emergentes, analizar las estrategias de precios de la competencia y encontrar oportunidades de negocio. Imprescindible para cualquier negocio de e-commerce.',
    avatarId: 'agent6',
  },
  {
    id: '7',
    name: 'Image Generator',
    specialty: 'Crea imágenes y arte visual a partir de descripciones textuales.',
    longDescription:
      'Image Generator transforma tus ideas en imágenes de alta calidad. Utilizando modelos de difusión avanzados, puede crear desde logos y prototipos de productos hasta obras de arte complejas a partir de simples descripciones en texto.',
    avatarId: 'agent7',
  },
  {
    id: '8',
    name: 'Social Media Manager',
    specialty:
      'Automatiza publicaciones y analiza el engagement en redes sociales.',
    longDescription:
      'Social Media Manager planifica y automatiza tus publicaciones en múltiples plataformas. Además, analiza el rendimiento de tus contenidos, mide el engagement y te ofrece insights para optimizar tu estrategia en redes sociales.',
    avatarId: 'agent8',
  },
];

const getImage = (avatarId: string) => {
  return PlaceHolderImages.find((img) => img.id === avatarId);
};

const AGENTS_PER_PAGE = 4;

export default function Home() {
  const [agents, setAgents] = useState(allAgents.slice(0, AGENTS_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(allAgents.length > AGENTS_PER_PAGE);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const loadMoreAgents = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      const currentLength = agents.length;
      const newAgents = allAgents.slice(
        currentLength,
        currentLength + AGENTS_PER_PAGE
      );
      setAgents((prevAgents) => [...prevAgents, ...newAgents]);

      if (currentLength + AGENTS_PER_PAGE >= allAgents.length) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, [agents.length, hasMore, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreAgents();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreAgents]);

  const handleConnectClick = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleCloseDialog = () => {
    setSelectedAgent(null);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Agent Store
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Explore. Choose. Control.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => {
          const avatar = getImage(agent.avatarId);
          return (
            <Card
              key={agent.id}
              className="flex flex-col items-center justify-between p-6 text-center overflow-hidden rounded-lg shadow-lg transition-transform transition-colors hover:scale-105 hover:bg-muted"
            >
              <CardHeader className="p-0">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src={avatar?.imageUrl}
                    alt={avatar?.description}
                    data-ai-hint={avatar?.imageHint}
                    className="aspect-square object-cover"
                  />
                  <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="text-xl font-bold">
                  {agent.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  {agent.specialty}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-0 mt-4">
                <Button
                  className="w-full"
                  onClick={() => handleConnectClick(agent)}
                >
                  Conectar a proyecto
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <Chatbot />
      {selectedAgent && (
        <AgentDetailsDialog
          agent={selectedAgent}
          isOpen={!!selectedAgent}
          onClose={handleCloseDialog}
        />
      )}
    </main>
  );
}
