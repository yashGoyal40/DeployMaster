import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";



export default function Dashboard() {
  const data = useSelector((state) => state.charts)
  const basicData = useSelector((state) => state.data)
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Welcome, User!</h1>
      
      {/* Dashboard Cards Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{basicData.deployments}</div>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Repositories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{basicData.repositories}</div>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{basicData.environments}</div>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{basicData.errors}</div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center md:text-left">Deployment Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] sm:h-[300px] min-w-[300px]">
          {/* Set a minimum width for the chart container */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="deployments" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 gap-4">
        <Button className="w-full sm:w-auto">Connect Repository</Button>
        <Button variant="outline" className="w-full sm:w-auto">
          Deploy Now
        </Button>
      </div>
    </div>
  );
}
