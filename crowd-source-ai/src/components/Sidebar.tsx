"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Sidebar() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/summaries");
      const data = await response.json();
      setSummaries(data);
    } catch (error) {
      console.error("Error fetching summaries:", error);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full lg:w-1/4 min-h-screen bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 
        flex flex-col fixed left-0 top-16 overflow-y-auto">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Summarized Posts
        </h3>
      </CardHeader>

      <CardContent className="flex-grow overflow-auto">
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : (
          <ul className="space-y-3">
            {summaries.length > 0 ? (
              summaries.map((summary, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 border-b pb-2">
                  {summary.content}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No summaries available.</p>
            )}
          </ul>
        )}
      </CardContent>

      <CardFooter>
        <Button onClick={fetchSummaries} className="w-full" disabled={loading}>
          Refresh Summaries
        </Button>
      </CardFooter>
    </Card>
  );
}
