import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format } from 'date-fns';
import { TimePoint } from '../../types/time-point';

interface PnlChartProps {
  historicPnl: TimePoint[]
}

export function PnlChart(props: PnlChartProps) {
  const chartPnl = props.historicPnl.map(pnl => ({
    timestamp: pnl.timestamp.getTime(),
    point: pnl.point.toNumber()
  }));

  console.log(chartPnl);
  return (
    <ResponsiveContainer>
      <LineChart data={chartPnl}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" type="number" tickFormatter={(date) => format(new Date(date), "dd/MM/yyyy")} domain={["auto", "auto"]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="point" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
