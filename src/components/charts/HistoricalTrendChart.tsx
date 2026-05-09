'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoricalData {
  year: number;
  BJP: number;
  INC: number;
  OTH: number;
}

interface Props {
  data: HistoricalData[];
}

export const HistoricalTrendChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#71717a', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#71717a', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line type="monotone" dataKey="BJP" stroke="#FF9933" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="INC" stroke="#19AAED" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="OTH" stroke="#A9A9A9" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
