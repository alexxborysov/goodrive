import type { ReactNode } from 'react';
import { AuthorizedView } from '~/core/auth/view/auth.guard';
import { SidebarProvider } from '~/shared/view/ui/sidebar';
import { ApplicationSidebar } from '~/view/sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthorizedView>
      <SidebarProvider>
        <div className="relative hidden h-[100dvh] w-full overflow-hidden lg:flex">
          <div className="w-full flex-none md:w-64">
            <ApplicationSidebar />
          </div>
          <div className="border-border/60 bg-secondary/10 mx-2 mt-[60px] mb-[8px] hidden w-full flex-grow overflow-hidden rounded-sm border p-4 lg:flex">
            {children}
          </div>
        </div>

        <span className="text-foreground absolute top-1/2 left-1/2 w-full -translate-x-1/2 px-4 text-center opacity-60 lg:hidden">
          This dashboard needs more real estate than your phone can afford!
        </span>
      </SidebarProvider>
    </AuthorizedView>
  );
}
