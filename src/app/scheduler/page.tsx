'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { apiClient } from '@/lib/api/client';

interface Event {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  priority: string;
  description?: string;
}

export default function SchedulerPage() {
  const { user, backendToken } = useAuthStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: 'general',
    priority: 'medium',
  });

  useEffect(() => {
    fetchEvents();
  }, [backendToken]);

  const fetchEvents = async () => {
    try {
      const res = await apiClient.get('/scheduler/events');
      setEvents(res.data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      alert('Title is required');
      return;
    }

    try {
      const res = await apiClient.post('/scheduler/events', formData);

      if (res.success) {
        setEvents([...events, res.data]);
        setFormData({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          category: 'general',
          priority: 'medium',
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to add event:', error);
      alert('Failed to create event');
    }
  };

  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    return eventDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Farm Scheduler</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Calendar</h2>
              <div className="space-y-2">
                {events.length === 0 ? (
                  <p className="text-gray-500">No events scheduled</p>
                ) : (
                  events.slice(0, 5).map((event) => (
                    <div
                      key={event._id}
                      className="p-2 bg-blue-50 rounded text-sm cursor-pointer hover:bg-blue-100"
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="lg:col-span-2">
            {/* Add Event Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {showForm ? 'Cancel' : 'Add Event'}
            </button>

            {/* Add Event Form */}
            {showForm && (
              <form
                onSubmit={handleAddEvent}
                className="bg-white rounded-lg shadow p-6 mb-6"
              >
                <h2 className="text-xl font-bold mb-6">New Event</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Event title"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="general">General</option>
                        <option value="planting">Planting</option>
                        <option value="harvesting">Harvesting</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priority: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            )}

            {/* Events List */}
            <div className="space-y-4">
              {loading ? (
                <p>Loading events...</p>
              ) : events.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No events scheduled yet
                </p>
              ) : (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <p className="text-gray-600">
                          {new Date(event.startDate).toLocaleString()}
                        </p>
                        <div className="mt-2 space-x-2">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {event.category}
                          </span>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs ${
                              event.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : event.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {event.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
