import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { Checkbox } from "@/components/ui/checkbox";
import { loginAction } from "@/actions/loginAction";
import { signupAction } from "@/actions/signupAction";
import { verifyEmailAction } from "@/actions/verifyEmailAction";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner"; // Assuming you have a Spinner component

export default function SignupPage() {
  const [step, setStep] = useState(1); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading
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

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = validatePassword(password);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading to true
    try {
      await dispatch(signupAction(name, email, password));
      setStep(2); // Proceed to the email verification step
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      await dispatch(verifyEmailAction(email, verificationCode)); 
      await dispatch(loginAction(email, password));
      navigate("/dashboard");
    } catch (error) {
      console.error("Verification failed", error);
      alert("Verification failed. Please check the code and try again.");
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        {step === 1 ? (
          <>
            {/* Signup Form */}
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription>
                Enter your information to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
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
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setValidationErrors(validatePassword(e.target.value));
                      }}
                      required
                    />
                    <ul className="text-xs text-red-500 space-y-1 mt-2">
                      {Object.values(validationErrors).map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={setAgreed}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit" disabled={!agreed || loading}>
                  {loading ? <Spinner /> : "Sign Up"} {/* Show spinner when loading */}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Login
                </a>
              </p>
            </CardFooter>
          </>
        ) : (
          <>
            {/* Email Verification */}
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
              <CardDescription>
                We have sent a verification code to {email}. Enter it below to verify your email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailVerification}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <Input
                      id="verification-code"
                      placeholder="Enter the code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                  <Button className="w-full mt-4" type="submit" disabled={loading}>
                    {loading ? <Spinner /> : "Verify Email"} {/* Show spinner when loading */}
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
