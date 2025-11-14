
'use client';

import {
  SidebarProvider,
  Sidebar as SidebarContainer,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  LineChart,
  Package,
  Users,
  BotMessageSquare,
  PanelLeftClose,
  PanelRightClose,
  Coins,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { Header } from './components/Header';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect } from 'react';

function CreditCounter() {
  const { isOpen } = useSidebar();
  return (
    <div className="rounded-lg bg-secondary p-2">
      <div
        className={cn(
          'flex items-center',
          isOpen ? 'justify-between' : 'justify-center'
        )}
      >
        <div className="flex items-center gap-2">
          <Coins className="size-5 shrink-0" />
          {isOpen && <span className="text-sm font-medium">1500 Créditos</span>}
        </div>
      </div>
    </div>
  );
}

function CollapseToggle() {
  const { isOpen, setIsOpen } = useSidebar();

  const Icon = isOpen ? PanelLeftClose : PanelRightClose;

  return (
    <SidebarMenuButton
      onClick={() => setIsOpen(!isOpen)}
      tooltip={{ children: isOpen ? 'Colapsar' : 'Expandir' }}
    >
      <Icon />
      <span className={cn(!isOpen && 'hidden')}>Colapsar</span>
    </SidebarMenuButton>
  );
}

function SidebarItems() {
  const pathname = usePathname();
  return (
    <>
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <BotMessageSquare className="h-6 w-6" />
          <span>Agent Hub</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="space-y-4">
          <CreditCounter />
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" passHref>
                <SidebarMenuButton
                  className={cn(
                    pathname === '/dashboard' &&
                      'bg-accent text-accent-foreground'
                  )}
                  tooltip={{ children: 'Dashboard' }}
                >
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: 'Products' }}>
                <Package />
                <span>Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: 'Customers' }}>
                <Users />
                <span>Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: 'Analytics' }}>
                <LineChart />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarMenu>
      </SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <CollapseToggle />
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

function DashboardMobileLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Header>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
        </Header>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
      <SheetContent side="left" className="w-[var(--sidebar-width)] p-0">
        <SidebarItems />
      </SheetContent>
    </Sheet>
  );
}

function DashboardDesktopLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarContainer>
        <SidebarItems />
      </SidebarContainer>
      <main
        className={cn(
          'flex flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 transition-all',
          isOpen
            ? 'ml-[var(--sidebar-width)]'
            : 'ml-[var(--sidebar-collapsed-width)]'
        )}
      >
        <Header />
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { setIsOpen } = useSidebar();

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile, setIsOpen]);

  if (isMobile) {
    return <DashboardMobileLayout>{children}</DashboardMobileLayout>;
  }
  return <DashboardDesktopLayout>{children}</DashboardDesktopLayout>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
