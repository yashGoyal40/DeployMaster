import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  GitBranch,
  FileText,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import { Link, useLocation } from "react-router-dom";

export default function SidebarComponent() {
  const { setTheme, theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: GitBranch, label: "Repositories", path: "/dashboard/repositories" },
    { icon: FileText, label: "Logs", path: "/dashboard/logs" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <Sidebar
      collapsible={isMobile ? "none" : "icon"}
      collapsed={isCollapsed || undefined}
      className={`${isMobile ? "w-16" : "w-64"} h-screen overflow-hidden`}
    >
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
          </svg>
          {!isMobile && !isCollapsed && (
            <span
              className={`text-lg font-semibold transition-opacity duration-300 ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              DeployMaster
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="overflow-hidden">
  <div
    className={`p-4 space-y-2 ${
      isMobile ? "flex flex-col items-center" : "flex flex-col items-start"
    }`}
  >
    <Button
      variant="ghost"
      className={`${
        isMobile ? "w-auto justify-center" : "w-full justify-start"
      }`}
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Moon className="mr-2 h-4 w-4" />
      ) : (
        <Sun className="mr-2 h-4 w-4" />
      )}
      {!isCollapsed && <span className={`${isMobile ? "hidden" : ""}`}>Toggle Theme</span>}
    </Button>
    <Button
      variant="ghost"
      className={`${
        isMobile ? "w-auto justify-center" : "w-full justify-start"
      }`}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {!isCollapsed && <span className={`${isMobile ? "hidden" : ""}`}>Logout</span>}
    </Button>
  </div>
</SidebarFooter>

    </Sidebar>
  );
}
