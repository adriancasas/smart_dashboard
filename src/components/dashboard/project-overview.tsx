import { agents, type Project } from '@/lib/data';
import { AgentCard } from './agent-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';

export function ProjectOverview({ project }: { project: Project }) {
  const assignedAgents = project.agentIds.map(id => agents.find(a => a.id === id)).filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Agent Status</h2>
        <p className="text-muted-foreground">An overview of agents assigned to "{project.name}"</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assignedAgents.map(agent => (
          agent && <AgentCard key={agent.id} agent={agent} />
        ))}
         <Card className="flex items-center justify-center border-2 border-dashed bg-muted/50 hover:border-primary hover:bg-muted transition-colors">
            <CardContent className="p-6 text-center">
                <Button variant="ghost" className="h-auto flex-col gap-2 p-6">
                    <PlusCircle className="h-8 w-8 text-muted-foreground" />
                    <span className="font-semibold text-muted-foreground">Add New Agent</span>
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
