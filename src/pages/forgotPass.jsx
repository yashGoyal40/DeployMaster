import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPasswordInitiateAction } from "@/actions/forgotPasswordAction";
import { forgotPasswordConfirmAction } from "@/actions/fofotPassConfirmAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResetMessage("Passwords do not match.");
      return;
    }

    try {
      await dispatch(forgotPasswordConfirmAction(email, code, newPassword));
      setMessage("Password reset successful! You can now log in.");
      setTimeout(() => {
        navigate("/auth/login")
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Password reset failed.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPasswordInitiateAction(email));
      setMessage("Verification code sent to your email.");
      setTimeout(() => {
        setStep(2);
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (step == 1) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
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
              </div>
              <Button className="w-full mt-4" type="submit">
                Send Verification Code
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (step == 2) {
    return (
      <>
        <div className="container flex items-center justify-center min-h-screen py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword}>
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
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      placeholder="Enter the code sent to your email"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      placeholder="Enter a new password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm your new password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  Reset Password
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              {resetMessage && <p className="text-center text-sm mt-2">{resetMessage}</p>}
            </CardFooter>
          </Card>
        </div>
      </>
    );
  }
}
