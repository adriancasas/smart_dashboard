
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
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
} from 'lucide-react';
import Link from 'next/link';
import { Header } from './components/Header';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar>
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
            <SidebarMenu className='space-y-4'>
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
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
