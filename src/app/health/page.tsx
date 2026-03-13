'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { apiClient } from '@/lib/api/client';

export default function PlantHealthPage() {
  const { user } = useAuthStore();
  const [imageUrl, setImageUrl] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [plantType, setPlantType] = useState('tomato');

  const handleAnalyze = async () => {
    if (!imageUrl.trim()) {
      alert('Please enter an image URL');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/health/analyze', {
        imageUrl,
        plantType,
      });

      if (res.success) {
        setAnalysis(res.data);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Plant Health Scanner</h1>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Analyze Plant Health</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plant Type</label>
              <select
                value={plantType}
                onChange={(e) => setPlantType(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="tomato">Tomato</option>
                <option value="wheat">Wheat</option>
                <option value="pepper">Pepper</option>
                <option value="cucumber">Cucumber</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/plant-image.jpg"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Plant'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            {/* Health Score */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold mb-4">Health Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Health Score</p>
                  <p className="text-4xl font-bold text-green-600">{analysis.healthScore}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Confidence</p>
                  <p className="text-4xl font-bold text-blue-600">{(analysis.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold mb-4">Care Recommendations</h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diseases */}
            {analysis.diseases.length > 0 && (
              <div className="bg-white rounded-lg shadow p-8">
                <h3 className="text-xl font-bold mb-4">Detected Issues</h3>
                <ul className="space-y-2">
                  {analysis.diseases.map((disease: string, idx: number) => (
                    <li key={idx} className="text-red-600">⚠️ {disease}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
