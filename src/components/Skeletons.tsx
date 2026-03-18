import React from 'react';

export const SkeletonLoader: React.FC<{ count?: number; height?: string }> = ({
  count = 3,
  height = 'h-12',
}) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`${height} bg-gray-200 rounded-lg animate-pulse`} />
    ))}
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 5,
  cols = 4,
}) => (
  <table className="w-full">
    <thead>
      <tr>
        {Array.from({ length: cols }).map((_, i) => (
          <th key={i} className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="border-b">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <td key={colIdx} className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    ))}
  </div>
);
