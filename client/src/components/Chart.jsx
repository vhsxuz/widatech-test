import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/revenue");
        const result = await response.json();
        setData(result.revenue);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white ps-56">
      {data.daily.length}
      {data.daily.length > 0 && (
        <LineChart width={500} height={300} data={data.daily}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
        </LineChart>
      )}
      {data.weekly.length}
      {data.weekly.length > 0 && (
        <LineChart width={500} height={300} data={data.weekly}>
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
        </LineChart>
      )}
      {data.monthly.length}
      {data.monthly.length > 0 && (
        <LineChart width={500} height={300} data={data.monthly}>
          <Line type="monotone" dataKey="value" stroke="#ffc658" />
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
        </LineChart>
      )}
    </div>
  );
};

export default Chart;