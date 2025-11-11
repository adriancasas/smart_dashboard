'use client';
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Folder, Settings, LifeBuoy, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Agent, Project, Folder as FolderType } from '@/lib/types';


export function SidebarNav() {
  const { user } = useUser();
  const firestore = useFirestore();

  const foldersQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'users', user.uid, 'folders'));
  }, [firestore, user]);

  const projectsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'team_projects'),
      where(`members.${user.uid}`, '==', 'member') // Simplified for demo
    );
  }, [firestore, user]);
  
  const agentsQuery = useMemoFirebase(() => {
      // For now, let's assume agents are public or user-specific under a sub-collection
      return collection(firestore, 'agents');
  }, [firestore]);


  const { data: folders, isLoading: isLoadingFolders } = useCollection<FolderType>(foldersQuery);
  const { data: projects, isLoading: isLoadingProjects } = useCollection<Project>(projectsQuery);
  const { data: agents, isLoading: isLoadingAgents } = useCollection<Agent>(agentsQuery);

  const totalCredits = 1500;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold">Agent Dashboard</span>
        </div>
        <div className="mt-4 rounded-lg bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">Total Available Credits</p>
          <p className="text-2xl font-bold">{totalCredits.toLocaleString()}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {isLoadingFolders || isLoadingProjects ? (
          <>
            <SidebarMenuSkeleton showIcon/>
            <SidebarMenuSkeleton showIcon/>
            <SidebarMenuSkeleton showIcon/>
          </>
        ) : (
          folders?.map(folder => (
            <SidebarGroup key={folder.id}>
              <SidebarGroupLabel>{folder.name}</SidebarGroupLabel>
              <SidebarMenu>
                {projects?.filter(p => p.folderId === folder.id).map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton tooltip={project.name} asChild isActive={project.id === 'proj-1'}>
                      <Link href="#">
                        <Folder />
                        <span>{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))
        )}
        
        <SidebarGroup>
          <SidebarGroupLabel>Agents</SidebarGroupLabel>
          <SidebarMenu>
            {isLoadingAgents ? (
              <>
                <SidebarMenuSkeleton showIcon/>
                <SidebarMenuSkeleton showIcon/>
              </>
            ) : (
              agents?.slice(0, 3).map((agent) => (
                <SidebarMenuItem key={agent.id}>
                  <SidebarMenuButton tooltip={agent.name} asChild>
                    <Link href="#">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{agent.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
             <SidebarMenuItem>
                <SidebarMenuButton variant="outline" size="sm" className="h-8 justify-center">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Add Agent</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
           <SidebarMenuItem>
             <SidebarMenuButton tooltip="Support" asChild>
               <Link href="#">
                 <LifeBuoy />
                 <span>Support</span>
               </Link>
             </SidebarMenuButton>
           </SidebarMenuItem>
           <SidebarMenuItem>
             <SidebarMenuButton tooltip="Settings" asChild>
               <Link href="#">
                 <Settings />
                 <span>Settings</span>
               </Link>
             </SidebarMenuButton>
           </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
