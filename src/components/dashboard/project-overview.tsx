import { AgentCard } from './agent-card';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Agent, Project } from '@/lib/types';
import { collection, query, where } from 'firebase/firestore';

export function ProjectOverview({ project }: { project: Project }) {
  const firestore = useFirestore();

  const agentsQuery = useMemoFirebase(() => {
      if (!project || !project.agentIds || project.agentIds.length === 0) return null;
      return query(collection(firestore, 'agents'), where('id', 'in', project.agentIds));
  }, [firestore, project]);

  const { data: agents } = useCollection<Agent>(agentsQuery);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Agent Status</h2>
        <p className="text-muted-foreground">An overview of agents assigned to "{project.name}"</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents?.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
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
