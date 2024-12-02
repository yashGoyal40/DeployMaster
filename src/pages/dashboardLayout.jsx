import SidebarComponent from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLoggedInAction } from "@/actions/authAction";
import { isLoggedIn } from "@/store/AuthSlice";
import { useEffect } from "react";


export default function DashboardLayout() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing session on initial load
    dispatch(checkLoggedInAction());
  }, [dispatch]);

  return (
      <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Render Sidebar only if the user is logged in */}
        {loggedIn ? (
          <>
            <SidebarComponent />
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </>
        ) : (
          <main className="flex-1 flex items-center justify-center">
            <p>Loading...</p>
          </main>
        )}
      </div>
    </SidebarProvider>
    
  );
}
