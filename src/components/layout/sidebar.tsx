'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Bookmark,
  BarChart,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSidebarOpen, toggleSidebarMinimized } from '@/store/slices/uiSlice';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: Bookmark },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sidebarOpen, sidebarMinimized } = useAppSelector((state) => state.ui);
  const bookmarkedCount = useAppSelector((state) => state.bookmarks.bookmarkedEmployees.length);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-1/2 z-[100] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent hover:shadow-lg transition-all md:flex",
          sidebarMinimized 
            ? "left-[calc(4.5rem-0.75rem)]"
            : "left-[calc(16rem-0.75rem)]"
        )}
        onClick={() => dispatch(toggleSidebarMinimized())}
      >
        {sidebarMinimized ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex transform flex-col border-r bg-background transition-all duration-200 ease-in-out md:static md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarMinimized ? 'w-[4.5rem]' : 'w-64',
        )}
      >
        <div className="flex h-full flex-col gap-2 overflow-y-auto p-4">
          <nav className="flex flex-1 flex-col gap-2 pt-[40px] sm:pt-0">
            <TooltipProvider>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const NavLink = (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className={cn(
                      "transition-opacity",
                      sidebarMinimized ? "opacity-0 hidden" : "opacity-100"
                    )}>
                      {item.name}
                    </span>
                    {item.name === 'Bookmarks' && bookmarkedCount > 0 && !sidebarMinimized && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs">
                        {bookmarkedCount}
                      </span>
                    )}
                  </Link>
                );

                return sidebarMinimized ? (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      {NavLink}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center">
                      {item.name}
                      {item.name === 'Bookmarks' && bookmarkedCount > 0 && (
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs">
                          {bookmarkedCount}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  NavLink
                );
              })}
            </TooltipProvider>
          </nav>

          {/* Logout Button */}
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'flex items-center gap-2 w-full justify-start',
                    'hover:bg-destructive/10 hover:text-destructive'
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 flex-shrink-0" />
                  <span className={cn(
                    "transition-opacity",
                    sidebarMinimized ? "opacity-0 hidden" : "opacity-100"
                  )}>
                    Logout
                  </span>
                </Button>
              </TooltipTrigger>
              {sidebarMinimized && (
                <TooltipContent side="right">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
    </>
  );
} 