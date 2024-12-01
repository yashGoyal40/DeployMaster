'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GitBranch, Globe, RefreshCw, ChevronDown, Search, AlertCircle } from 'lucide-react'
import { FaEye, FaCopy } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'


const statusColors = {
  deployed: 'bg-green-500',
  building: 'bg-yellow-500',
  error: 'bg-red-500',
}

const statusIcons = {
  deployed: RefreshCw,
  building: RefreshCw,
  error: AlertCircle,
}

export default function Repositories() {
  const repositories = useSelector((state) => state.repos.repos);

  const [visibleRepoId, setVisibleRepoId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleEnvVarsVisibility = (id) => {
    setVisibleRepoId(prevId => (prevId === id ? null : id))
  }

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard!')
  }

  const handleReveal = (value) => {
    toast.success(value, {
      duration: 4000,
      position: 'bottom-right',
      style: {
        background: '#3b82f6',
        color: '#ffffff',
      },
    })
  }

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Repositories</h1>
        <div className="w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10"
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        <motion.div layout className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.map((repo) => (
            <motion.div
              key={repo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="perspective-1000"
            >
              <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{repo.name}</CardTitle>
                      <CardDescription className="mt-1">{repo.description}</CardDescription>
                    </div>
                    <Badge className={`${statusColors[repo.status]} text-white`}>
                      {repo.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Globe className="h-4 w-4" />
                    <span>{repo.customDomain}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <GitBranch className="h-4 w-4" />
                    <span>main</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last deployed: {repo.lastDeployed}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    {React.createElement(statusIcons[repo.status], { className: "h-4 w-4 mr-2" })}
                    {repo.status === 'deployed' ? 'Redeploy' : repo.status === 'building' ? 'Building...' : 'View Error'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleEnvVarsVisibility(repo.id)}
                    className="w-full sm:w-auto"
                  >
                    <ChevronDown className="h-4 w-4 mr-2" />
                    {visibleRepoId === repo.id ? 'Back to Overview' : 'Env Variables'}
                  </Button>
                </CardFooter>

                {/* Conditionally Render Environment Variables */}
                {visibleRepoId === repo.id && (
                  <CardContent>
                    <ul className="space-y-2">
                      {repo.envVars.map((envVar) => (
                        <li key={envVar.key} className="flex justify-between items-center text-sm text-gray-500">
                          <span className="font-semibold text-gray-700">{envVar.key}</span>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReveal(envVar.value)}
                              className="p-1"
                            >
                              <FaEye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(envVar.value)}
                              className="p-1"
                            >
                              <FaCopy className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  )
}
