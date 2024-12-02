import SidebarComponent from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLoggedInAction } from "@/actions/authAction";
import { isLoggedIn } from "@/store/AuthSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const LoggedIn = useSelector(isLoggedIn)

  useEffect(() => {
    dispatch(checkLoggedInAction());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {LoggedIn ? (
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
