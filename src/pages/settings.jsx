

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Trash2, User, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [email] = useState('user@example.com')
  const [username, setUsername] = useState('username123')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [apps, setApps] = useState(['app1', 'app2', 'app3'])
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertAction, setAlertAction] = useState(() => {})

  const handleSaveSettings = () => {
    console.log('Settings saved!')
  }

  const handleDeleteAccount = () => {
    setShowAlert(true)
    setAlertTitle('Delete Account')
    setAlertMessage('Are you sure you want to delete your account? This action is irreversible.')
    setAlertAction(() => () => {
      // Implement account deletion logic here
      console.log('Account deleted')
      setShowAlert(false)
    })
  }

  const handleDeleteApp = (appName) => {
    setShowAlert(true)
    setAlertTitle('Delete App')
    setAlertMessage(`Are you sure you want to delete the app: ${appName}?`)
    setAlertAction(() => () => {
      setApps(apps.filter(app => app !== appName))
      setShowAlert(false)
    })
  }

  return (
    <div className="container mx-auto p-6 lg:p-10 xl:p-12 space-y-8 max-w-5xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Settings</h1>
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} readOnly disabled />
              </div>
              <div className="space-y-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter new username"
                />
              </div>
              <Button className="w-full sm:w-auto">Update Username</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Be careful with actions in this section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-3 block">Deployed Apps</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete a Deployed App
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {apps.map((app, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleDeleteApp(app)}
                      >
                        {app}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Button variant="destructive" onClick={handleDeleteAccount} className="w-full sm:w-auto">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-6 py-3">Save All Changes</Button>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowAlert(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={alertAction}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
