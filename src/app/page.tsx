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

const agents = [
  {
    id: '1',
    name: 'Data Miner',
    specialty: 'Especialista en extracción y análisis de datos a gran escala.',
    avatarId: 'agent1',
  },
  {
    id: '2',
    name: 'Web Crawler',
    specialty: 'Navega y extrae información de sitios web de forma automatizada.',
    avatarId: 'agent2',
  },
  {
    id: '3',
    name: 'Content Analyst',
    specialty: 'Analiza y resume grandes volúmenes de texto y contenido.',
    avatarId: 'agent3',
  },
  {
    id: '4',
    name: 'Code Generator',
    specialty: 'Genera fragmentos de código en múltiples lenguajes de programación.',
    avatarId: 'agent4',
  },
];

const getImage = (avatarId: string) => {
  return PlaceHolderImages.find((img) => img.id === avatarId);
};

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Agent Store
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Encuentra el agente perfecto para tus necesidades.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => {
          const avatar = getImage(agent.avatarId);
          return (
            <Card
              key={agent.id}
              className="flex flex-col items-center justify-between p-6 text-center overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
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
                <CardTitle className="text-xl font-bold">{agent.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  {agent.specialty}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-0 mt-4">
                <Button className="w-full">Conectar a proyecto</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Chatbot />
    </main>
  );
}
