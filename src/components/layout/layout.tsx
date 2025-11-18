import { Outlet } from "react-router";
import Header from "./header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="overflow-x-hidden">
            <main className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <SidebarTrigger />
                <Outlet />
              </div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
