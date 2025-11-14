
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Play } from 'lucide-react';
import { cn } from '@/lib/utils';


const agentsData = [
  {
    id: '1',
    name: 'Data Miner',
    description: 'Extracts and analyzes data from various sources.',
    tasks: {
      pending: [
        { id: 'task-1', label: 'Analyze Q2 sales report' },
        { id: 'task-2', label: 'Extract customer feedback from surveys' },
        { id: 'task-3', label: 'Generate leads from social media data' },
      ],
      completed: [
        {
          id: 'task-4',
          label: 'Generate Q1 market analysis report',
          fileUrl: '#',
        },
        {
          id: 'task-5',
          label: 'Compile competitor pricing information',
          fileUrl: '#',
        },
      ],
    },
  },
  // Add other agents here
];

export default function AgentDetailPage({
  params,
}: {
  params: { agentId: string };
}) {
  const agent = agentsData.find((a) => a.id === params.agentId);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const handleCheckedChange = (taskId: string, checked: boolean) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: checked }));
  };

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
        <p className="text-lg text-muted-foreground">{agent.description}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Checklist de Tareas</CardTitle>
            <CardDescription>
              Estas son las tareas actualmente asignadas a {agent.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agent.tasks.pending.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox id={task.id} />
                  <label
                    htmlFor={task.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task.label}
                  </label>
                </div>
                <Button variant="ghost" size="sm">
                  <span>Start</span>
                  <Play />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tareas Terminadas</CardTitle>
            <CardDescription>
              Revisa el output de las tareas completadas y márcalas como revisadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agent.tasks.completed.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`completed-${task.id}`}
                    checked={checkedTasks[task.id]}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(task.id, !!checked)
                    }
                  />
                  <label
                    htmlFor={`completed-${task.id}`}
                    className={cn(
                      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                      checkedTasks[task.id]
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    )}
                  >
                    {task.label}
                  </label>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={task.fileUrl} target="_blank">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver PDF
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
