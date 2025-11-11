import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import type { Agent } from "@/lib/types";
import { MoreVertical, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function AssignedAgentCard({ agent }: { agent: Agent }) {
  const isInactive = agent.status === 'inactive';
  const noCredits = agent.credits === 0;
  const lowCredits = agent.credits > 0 && agent.credits < 100;

  const statusColor = cn({
    'bg-gray-400': isInactive,
    'bg-red-500': noCredits,
    'bg-orange-400': lowCredits,
    'bg-green-500': !isInactive && !noCredits && !lowCredits,
  });
  const statusText = isInactive ? 'Inactive' : noCredits ? 'Recharge needed' : lowCredits ? 'Low Credits' : 'Active';

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={agent.avatarUrl} alt={agent.name} />
          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg font-bold">{agent.name}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={cn("h-2 w-2 rounded-full", statusColor)} />
            <span>{statusText}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>View Logs</DropdownMenuItem>
            <DropdownMenuItem>Edit Configuration</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Remove from Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-muted-foreground">Credit Balance</span>
            <span className="text-xl font-bold">{agent.credits.toLocaleString()}</span>
          </div>
          <Progress value={(agent.credits / 1000) * 100} className="h-2" />
        </div>
      </CardContent>
      {noCredits && (
        <CardFooter>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Recharge Credits</Button>
        </CardFooter>
      )}
    </Card>
  );
}

function AvailableAgentCard({ agent }: { agent: Agent }) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-dashed bg-muted/30 hover:border-primary">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={agent.avatarUrl} alt={agent.name} />
          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg font-bold">{agent.name}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-accent">
            <Sparkles className="h-4 w-4" />
            <span>Ready to get hands on</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription>{agent.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Assign credit &amp; Activate</Button>
      </CardFooter>
    </Card>
  );
}


export function AgentCard({ agent }: { agent: Agent }) {
  if (agent.status === 'available') {
    return <AvailableAgentCard agent={agent} />;
  }
  return <AssignedAgentCard agent={agent} />;
}
