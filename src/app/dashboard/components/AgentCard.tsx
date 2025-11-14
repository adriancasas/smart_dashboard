
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface AgentCardProps {
  name: string;
  description: string;
  avatarUrl: string;
}

export function AgentCard({ name, description, avatarUrl }: AgentCardProps) {
  return (
    <Card className="transform-gpu transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <div className="relative h-full w-full">
            <Image
              src={`https://picsum.photos/seed/${name}/100/100`}
              alt={`${name} avatar`}
              fill
              className="rounded-full"
              data-ai-hint="robot abstract"
            />
          </div>
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
