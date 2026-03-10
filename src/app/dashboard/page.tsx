'use client';

import React from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { apiClient } from '@/lib/api/client';

export default function DashboardPage() {
  const { user, backendToken } = useAuthStore();
  const [stats, setStats] = React.useState({
    totalEvents: 0,
    todaysEvents: 0,
    resourcesUsed: 0,
    forumPosts: 0,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!backendToken) return;

        // Fetch all dashboard stats in parallel
        const [eventsRes, resourcesRes] = await Promise.all([
          apiClient.get('/scheduler/events'),
          apiClient.get('/resources/usage'),
        ]).catch(() => [null, null]);

        setStats({
          totalEvents: eventsRes?.data?.length || 0,
          todaysEvents: 0,
          resourcesUsed: resourcesRes?.summary?.count || 0,
          forumPosts: 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [backendToken]);

  if (!user) {
    return <div className="p-8">Loading user data...</div>;
  }

  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Scheduled Tasks</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalEvents}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Today's Tasks</h3>
            <p className="text-3xl font-bold mt-2">{stats.todaysEvents}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Resources Used</h3>
            <p className="text-3xl font-bold mt-2">{stats.resourcesUsed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Community Posts</h3>
            <p className="text-3xl font-bold mt-2">{stats.forumPosts}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <p className="font-medium">Schedule Task</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <p className="font-medium">Log Resource</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <p className="font-medium">View Forum</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <p className="font-medium">Ask Chatbot</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
