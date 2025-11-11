import type { ReactNode } from 'react';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Header } from './header';
import type { Project } from '@/lib/types';
import { Chatbot } from './chatbot';

export default function DashboardLayout({ children, project }: { children: ReactNode, project: Project | null | undefined }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="bg-background">
        <Header project={project} />
        <main className="p-4 lg:p-6">{children}</main>
        <Chatbot />
      </SidebarInset>
    </SidebarProvider>
  );
}
