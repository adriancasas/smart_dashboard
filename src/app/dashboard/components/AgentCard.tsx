
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  name: string;
  description: string;
  avatarUrl: string;
  status?: 'Active' | 'Reactivate';
}

export function AgentCard({
  name,
  description,
  avatarUrl,
  status,
}: AgentCardProps) {
  return (
    <Card className="transform-gpu transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
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
        <div className="flex-1">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <CardDescription className="text-base mt-1">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto pt-4 flex justify-end">
        {status && (
          <Badge
            className={cn(
              status === 'Active' && 'bg-accent text-accent-foreground',
              status === 'Reactivate' &&
                'bg-yellow-400 text-yellow-900 hover:bg-yellow-400/80'
            )}
          >
            {status}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
