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
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) errors.length = "Must be at least 8 characters.";
    if (!/[0-9]/.test(password)) errors.number = "Must include a number.";
    if (!/[a-z]/.test(password))
      errors.lowercase = "Must include a lowercase letter.";
    if (!/[A-Z]/.test(password))
      errors.uppercase = "Must include an uppercase letter.";
    if (!/[!@#$%^&*]/.test(password))
      errors.symbol = "Must include a special character.";
    return errors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const errors = validatePassword(newPassword);
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (newPassword !== confirmPassword) {
      setResetMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(forgotPasswordConfirmAction(email, code, newPassword));
      setMessage("Password reset successful! You can now log in.");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(forgotPasswordInitiateAction(email));
      setMessage("Verification code sent to your email.");
      setTimeout(() => {
        setStep(2);
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <Spinner />
          </div>
        )}
        <Card className={`w-full max-w-md ${loading ? "opacity-50" : ""}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
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
              <Button className="w-full mt-4" type="submit" disabled={loading}>
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

  if (step === 2) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <Spinner />
          </div>
        )}
        <Card className={`w-full max-w-md ${loading ? "opacity-50" : ""}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
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
                  {Object.keys(passwordErrors).length > 0 && (
                    <ul className="text-sm text-red-500 mt-2">
                      {Object.values(passwordErrors).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
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
              <Button className="w-full mt-4" type="submit" disabled={loading}>
                Reset Password
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            {resetMessage && <p className="text-center text-sm mt-2">{resetMessage}</p>}
          </CardFooter>
        </Card>
      </div>
    );
  }
}
