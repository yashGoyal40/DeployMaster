import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPasswordInitiateAction } from "@/actions/forgotPasswordAction";
import { forgotPasswordConfirmAction } from "@/actions/forgotPassConfirmAction";
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
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) errors.length = "Must be at least 8 characters.";
    if (!/[0-9]/.test(password)) errors.number = "Must include a number.";
    if (!/[a-z]/.test(password)) errors.lowercase = "Must include a lowercase letter.";
    if (!/[A-Z]/.test(password)) errors.uppercase = "Must include an uppercase letter.";
    if (!/[!@#$%^&*]/.test(password)) errors.symbol = "Must include a special character.";
    return errors;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(forgotPasswordInitiateAction(email));
      setMessage("Verification code sent to your email.");
      setStep(2);
    } catch (error) {
      setMessage(error.message || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const errors = validatePassword(newPassword);
    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) return;
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(forgotPasswordConfirmAction(email, code, newPassword));
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (error) {
      setMessage(error.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <Spinner />
        </div>
      )}
      <Card className="w-full max-w-md">
        {step === 1 ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword}>
                <div className="space-y-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full mt-4" type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Send Verification Code"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              {message && <p className="text-center text-sm mt-2">{message}</p>}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    placeholder="Enter the code sent to your email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordErrors(validatePassword(e.target.value));
                    }}
                    required
                  />
                  {Object.keys(passwordErrors).length > 0 && (
                    <ul className="text-sm text-red-500 mt-2">
                      {Object.values(passwordErrors).map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  )}
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full mt-4" type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Reset Password"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              {message && <p className="text-center text-sm mt-2">{message}</p>}
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
