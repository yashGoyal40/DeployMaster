"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export default function LogsPage() {
  const logs = useSelector((state) => state.logs.logs);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [appFilter, setAppFilter] = useState("");
  console.log(logs)

  useEffect(() => {
    const filtered = logs.filter(
      (log) =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
        log.app.toLowerCase().includes(appFilter.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [searchTerm, appFilter, logs]);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Logs</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10"
            />
          </div>
        </div>
        \{" "}
        <div className="w-full sm:w-1/4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Filter by application..."
              value={appFilter}
              onChange={(e) => setAppFilter(e.target.value)}
              className="w-full sm:w-64 pl-10"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredLogs.map((log) => (
            <motion.div
              key={log.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{log.message}</CardTitle>
                    </div>
                    <div className="pl-2">
                      <Badge
                        className={
                          log.level === "error"
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }
                      >
                        {log.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>App: {log.app}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Timestamp: {log.timestamp}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
