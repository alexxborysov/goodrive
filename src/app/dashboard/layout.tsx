import type { ReactNode } from "react";
import { AuthorizedView } from "~/core/auth/view/auth.guard";
import { SidebarProvider } from "~/shared/view/ui/sidebar";
import { ApplicationSidebar } from "~/view/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthorizedView>
      <SidebarProvider>
        <div className="h-[100dvh] w-full overflow-hidden hidden lg:flex relative">
          <div className="w-full flex-none md:w-64">
            <ApplicationSidebar />
          </div>
          <div className="flex-grow w-full p-4 overflow-hidden border-border/60 border rounded-sm mb-[8px] mx-2 mt-[60px] bg-secondary/10 hidden lg:flex">
            {children}
          </div>
        </div>

        <span className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 text-foreground opacity-60 w-full text-center px-4">
          This dashboard needs more real estate than your phone can afford!
        </span>
      </SidebarProvider>
    </AuthorizedView>
  );
}
