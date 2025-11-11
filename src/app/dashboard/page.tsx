'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/layout';
import { ProjectOverview } from '@/components/dashboard/project-overview';
import { projects } from '@/lib/data';
import { useUser } from '@/firebase';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Loading dashboard...</p>
        </div>
    );
  }

  const defaultProject = projects.find(p => p.id === 'proj-1');

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
