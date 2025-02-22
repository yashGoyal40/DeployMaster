import SidebarComponent from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedInAction } from "@/actions/authAction";
import { isLoggedIn } from "@/store/AuthSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const LoggedIn = useSelector(isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkLoggedInAction());

    if (!LoggedIn) {
      navigate("/auth/login");
    }
  }, [dispatch, LoggedIn, navigate]);

  if(!LoggedIn){
    return(
      <>
      <Spinner />
      </>
    )
  }


  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarComponent />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
