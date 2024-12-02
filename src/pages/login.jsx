import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "@/actions/loginAction";
import Spinner from "@/components/Spinner";
import { checkLoggedInAction } from "@/actions/authAction";
import { isLoggedIn } from "@/store/AuthSlice";
import { googleLoginAction } from "@/actions/googleAction";
import { initiateGoogleLogin } from "@/services/google.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    dispatch(checkLoggedInAction());
  }, [LoggedIn, dispatch]);

  useEffect(() => {
    if (LoggedIn) {
      navigate("/dashboard");
    }
  }, [LoggedIn, navigate]);

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      dispatch(googleLoginAction(code)); // Dispatch google login action to get tokens and login the user
      navigate("/dashboard"); // Navigate to dashboard after successful login
    }
  }, [dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginAction(email, password));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    initiateGoogleLogin(); // This will redirect to Google OAuth
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <Spinner />
        </div>
      )}
      <Card className={`w-full max-w-md ${loading ? "opacity-50" : ""}`}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
          <CardDescription>
            Login to continue managing your deployments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4" type="submit" disabled={loading}>
              Login
            </Button>
          </form>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={handleGoogleLogin}
            >
              <img
                src="/google.svg" 
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            <a
              href="/auth/passwordreset"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot Password?
            </a>
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/auth/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
