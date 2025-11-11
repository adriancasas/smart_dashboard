'use client';

import { useAuth, useUser } from '@/firebase';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, User, Users, Plus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { notifications as notificationsData } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import type { Project, User as UserType } from '@/lib/types';

const teamMembers: UserType[] = [];

export function Header({ project }: { project: Project | null | undefined }) {
  const auth = useAuth();
  const { user: currentUser } = useUser();

  if (!currentUser) return null;
  
  return (
    <header className="flex h-20 items-center gap-4 border-b bg-card px-4 lg:px-6">
      <SidebarTrigger className="hidden lg:flex" />
      
      <div className="flex-1 truncate">
        {project ? (
          <>
            <p className="text-sm text-muted-foreground">Project</p>
            <h1 className="truncate text-xl font-bold tracking-tight">{project.name}</h1>
          </>
        ) : (
          <h1 className="truncate text-xl font-bold tracking-tight">Dashboard</h1>
        )}
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        {project && (
          <>
            <div className="hidden -space-x-2 md:flex">
              {teamMembers.slice(0, 3).map(user => (
                user &&
                <Avatar key={user.id} className="h-9 w-9 border-2 border-card">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {teamMembers.length > 3 && (
                <Avatar className="h-9 w-9 border-2 border-card">
                  <AvatarFallback>+{teamMembers.length - 3}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              <Users className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="hidden bg-primary hover:bg-primary/90 lg:inline-flex">
              <Plus className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
            <Separator orientation="vertical" className="h-8 hidden md:block" />
          </>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary ring-1 ring-background" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-2">
              <div className="space-y-1">
                <h4 className="font-medium leading-none">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have {notificationsData.filter(n => !n.read).length} unread messages.</p>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
              {notificationsData.map(notification => (
                <div key={notification.id} className="text-sm grid grid-cols-[25px_1fr] items-start pb-2 last:pb-0">
                   <span className={`flex h-2 w-2 translate-y-1 rounded-full ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                   <div className="grid gap-1">
                     <p>{notification.text}</p>
                     <p className="text-xs text-muted-foreground">{notification.time}</p>
                   </div>
                </div>
              ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || 'User'} />
                <AvatarFallback>{currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{currentUser.isAnonymous ? "Anonymous User" : currentUser.displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => auth.signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
