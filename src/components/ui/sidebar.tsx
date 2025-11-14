'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, isMobile, setIsOpen } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[var(--sidebar-width)] p-0">
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-background transition-all',
        isOpen
          ? 'w-[var(--sidebar-width)]'
          : 'w-[var(--sidebar-collapsed-width)]',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useSidebar();
  return (
    <div
      className={cn(
        'flex h-[var(--header-height)] items-center border-b px-4',
        !isOpen && 'justify-center',
        className
      )}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex-1 overflow-y-auto overflow-x-hidden', className)}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-2 p-2', className)} {...props} />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

interface SidebarMenuButtonProps extends ButtonProps {
  tooltip?: {
    children: React.ReactNode;
    props?: React.ComponentProps<typeof TooltipContent>;
  };
}

export function SidebarMenuButton({
  className,
  children,
  tooltip,
  ...props
}: SidebarMenuButtonProps) {
  const { isOpen } = useSidebar();

  if (!isOpen) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'flex w-full items-center justify-center',
                className
              )}
              {...props}
            >
              {React.Children.toArray(children)[0]}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" {...tooltip?.props}>
            {tooltip?.children}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn('w-full justify-start', className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export function SidebarInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, isMobile } = useSidebar();

  if (isMobile) {
    return <main {...props} />;
  }
  return (
    <main
      className={cn(
        'transition-all',
        isOpen
          ? 'ml-[var(--sidebar-width)]'
          : 'ml-[var(--sidebar-collapsed-width)]',
        className
      )}
      {...props}
    />
  );
}

export function SidebarTrigger({
  className,
  ...props
}: ButtonProps) {
  const { isMobile } = useSidebar();
  if (!isMobile) {
    return null;
  }
  return (
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" {...props}>
        <Menu />
      </Button>
    </SheetTrigger>
  );
}
