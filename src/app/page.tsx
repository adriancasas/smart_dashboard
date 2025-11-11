'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { initiateAnonymousSignIn, useAuth } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

import DashboardLayout from '@/components/dashboard/layout';
import { ProjectOverview } from '@/components/dashboard/project-overview';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import type { Project } from '@/lib/types';
import { SidebarMenuSkeleton } from '@/components/ui/sidebar';

function LoginPage() {
  const auth = useAuth();
  const handleAnonymousSignIn = () => {
    initiateAnonymousSignIn(auth);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to Agent Dashboard
        </h1>
        <p className="text-muted-foreground">
          Sign in to manage your agents and projects. For this demo, you can
          continue with an anonymous account.
        </p>
        <Button onClick={handleAnonymousSignIn} className="w-full" size="lg">
          Sign In Anonymously
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'team_projects'),
      where(`members.${user.uid}`, '==', 'member') // Simplified for demo
    );
  }, [firestore, user]);
  
  const { data: projects, isLoading: isLoadingProjects } = useCollection<Project>(projectsQuery);

  if (isUserLoading || (user && isLoadingProjects)) {
    return (
      <DashboardLayout project={null}>
        <div className="p-4 lg:p-6">
          <div className="space-y-6">
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const defaultProject = projects?.[0];

  return (
    <DashboardLayout project={defaultProject}>
      {defaultProject ? (
        <ProjectOverview project={defaultProject} />
      ) : (
        <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Select a project to get started.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
