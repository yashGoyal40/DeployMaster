import SidebarComponent from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLoggedInAction } from "@/actions/authAction";
import { isLoggedIn } from "@/store/AuthSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const LoggedIn = useSelector(isLoggedIn)
  const navigate = useNavigate();

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
          navigate("/auth/login")
        )}
      </div>
    </SidebarProvider>
  );
}
