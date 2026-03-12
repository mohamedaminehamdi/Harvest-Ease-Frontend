'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { apiClient } from '@/lib/api/client';

interface Resource {
  _id: string;
  resourceName: string;
  quantity: number;
  unit: string;
  cost: number;
  date: string;
}

export default function ResourcesPage() {
  const { user, backendToken } = useAuthStore();
  const [resources, setResources] = useState<Resource[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    resourceName: 'water',
    quantity: '',
    unit: 'liters',
    cost: '',
  });

  useEffect(() => {
    fetchResources();
  }, [backendToken]);

  const fetchResources = async () => {
    try {
      const res = await apiClient.get('/resources/usage');
      setResources(res.data || []);
      setTotalCost(res.summary?.totalCost || 0);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await apiClient.post('/resources/usage', {
        ...formData,
        quantity: parseFloat(formData.quantity),
        cost: parseFloat(formData.cost),
      });

      if (res.success) {
        setResources([res.data, ...resources]);
        setTotalCost(
          totalCost + parseFloat(formData.cost)
        );
        setFormData({
          resourceName: 'water',
          quantity: '',
          unit: 'liters',
          cost: '',
        });
      }
    } catch (error) {
      console.error('Failed to add resource:', error);
    }
  };

  const handleDeleteResource = async (id: string) => {
    try {
      await apiClient.delete(`/resources/usage/${id}`);
      const deleted = resources.find((r) => r._id === id);
      if (deleted) {
        setTotalCost(totalCost - deleted.cost);
        setResources(resources.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete resource:', error);
    }
  };

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Resources Tracker</h1>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Total Entries</p>
            <p className="text-3xl font-bold">{resources.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Total Cost</p>
            <p className="text-3xl font-bold">₹{totalCost.toFixed(2)}</p>
          </div>
        </div>

        {/* Add Resource Form */}
        <form
          onSubmit={handleAddResource}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-6">Log Resource Usage</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Resource</label>
              <select
                value={formData.resourceName}
                onChange={(e) =>
                  setFormData({ ...formData, resourceName: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="water">Water</option>
                <option value="fertilizer">Fertilizer</option>
                <option value="pesticide">Pesticide</option>
                <option value="seed">Seed</option>
                <option value="equipment">Equipment</option>
                <option value="labor">Labor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                placeholder="0"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="liters">Liters</option>
                <option value="kg">KG</option>
                <option value="units">Units</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cost (₹)</label>
              <input
                type="number"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: e.target.value })
                }
                placeholder="0.00"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Resource
          </button>
        </form>

        {/* Resources List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Resource</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Cost</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No resources recorded yet
                  </td>
                </tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{resource.resourceName}</td>
                    <td className="px-6 py-4">
                      {resource.quantity} {resource.unit}
                    </td>
                    <td className="px-6 py-4">₹{resource.cost.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {new Date(resource.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteResource(resource._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
