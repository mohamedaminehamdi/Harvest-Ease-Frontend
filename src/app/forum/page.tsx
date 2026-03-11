'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { apiClient } from '@/lib/api/client';

interface Tweet {
  _id: string;
  content: string;
  userId: { name: string; picturePath?: string };
  likes: string[];
  comments: string[];
  createdAt: string;
}

export default function ForumPage() {
  const { user, backendToken } = useAuthStore();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newTweet, setNewTweet] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTweets();
  }, [backendToken]);

  const fetchTweets = async () => {
    try {
      const res = await apiClient.get('/forum/tweets');
      setTweets(res.data || []);
    } catch (error) {
      console.error('Failed to fetch tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostTweet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTweet.trim()) return;

    try {
      const res = await apiClient.post('/forum/tweets', {
        content: newTweet,
        userId: user?._id,
      });

      if (res.success) {
        setTweets([res.data, ...tweets]);
        setNewTweet('');
      }
    } catch (error) {
      console.error('Failed to post tweet:', error);
    }
  };

  const handleLikeTweet = async (tweetId: string) => {
    try {
      const res = await apiClient.post(`/forum/tweets/${tweetId}/like`, {
        userId: user?._id,
      });

      if (res.success) {
        setTweets(
          tweets.map((t) =>
            t._id === tweetId ? { ...t, likes: res.data.likes } : t
          )
        );
      }
    } catch (error) {
      console.error('Failed to like tweet:', error);
    }
  };

  return (
    <main className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Community Forum</h1>

        {/* Tweet Composer */}
        <form
          onSubmit={handlePostTweet}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <textarea
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            placeholder="Share your farming experience..."
            className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
            rows={4}
          />
          <button
            type="submit"
            disabled={!newTweet.trim() || loading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Post
          </button>
        </form>

        {/* Tweets Feed */}
        <div className="space-y-6">
          {loading ? (
            <p>Loading posts...</p>
          ) : tweets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts yet</p>
          ) : (
            tweets.map((tweet) => (
              <div key={tweet._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold">{tweet.userId.name}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(tweet.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 mb-4">{tweet.content}</p>
                <div className="flex gap-6 text-gray-500 text-sm">
                  <button
                    onClick={() => handleLikeTweet(tweet._id)}
                    className="hover:text-blue-600"
                  >
                    ❤️ {tweet.likes.length}
                  </button>
                  <button className="hover:text-blue-600">
                    💬 {tweet.comments.length}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
