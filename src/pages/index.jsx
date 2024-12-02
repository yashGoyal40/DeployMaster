import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { isLoggedIn } from "@/store/AuthSlice";

export default function LandingPage() {
  
  const loggedIn = useSelector(isLoggedIn)

  return (
    <>
      <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Deploy Smarter, Scale Faster
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Automate your deployments and manage environment variables
                seamlessly from a single platform.
              </p>
            </div>
            <div className="space-x-4">
            <Link to="/auth/signup">
              <Button size="lg" className="animate-bounce">
                Get Started for Free
              </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Feature Highlights
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Fast Deployments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deploy your applications with lightning speed and reliability.
                </CardDescription>
                <Button className="mt-4" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Custom Domains</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easily configure and manage custom domains for your
                  deployments.
                </CardDescription>
                <Button className="mt-4" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Securely manage and update environment variables across all
                  your deployments.
                </CardDescription>
                <Button className="mt-4" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        {/* Pricing Section */}
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Pricing Plans
          </h2>
          <p className="text-center text-lg mb-6">
            <span className="font-semibold text-green-500">Free for development!</span> 
            Our platform is completely free for development purposes.
          </p>
          {/* Add your pricing cards or details here */}
        </div>
      </section>
    </>
  );
}
