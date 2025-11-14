import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    name: 'Agent Dashboard',
    description: 'Manage your agents and their credit balance.',
    href: '/dashboard',
  },
  {
    name: 'Agent Store',
    description: 'Discover and deploy new agents.',
    href: '#', // The agent-store page was removed in a previous step
  },
  {
    name: 'LLM Agent Store',
    description: 'An advanced store for LLM-powered agents.',
    href: '#', // The llm-agent-store page was removed
  },
  {
    name: 'Dashboard 360',
    description: 'A comprehensive 360-degree dashboard.',
    href: '#', // The dashboard-360 page was removed
  },
];

export default function Home() {
  return (
    <main className="container mx-auto flex h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to Your Project Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a project below to get started.
        </p>
      </div>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Link href={project.href} key={project.name}>
            <Card className="flex h-full transform-gpu flex-col transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="flex-1">
                <CardTitle className="flex items-center justify-between">
                  <span>{project.name}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription className="pt-2">{project.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
