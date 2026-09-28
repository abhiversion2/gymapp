import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Scale, TrendingDown } from 'lucide-react';
import { Card } from '../common/Card';

export interface WeightProgressChartProps {
  data: { date: string; month: string; weightKg: number; bodyFat?: number }[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { month: string; date: string; weightKg: number; bodyFat?: number } }>;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl bg-[#13161D] border border-[#2F374A] p-3 shadow-2xl text-xs">
        <p className="font-bold text-white mb-1">{item.month} ({item.date})</p>
        <p className="text-[#C6FF3D] font-extrabold text-sm">
          {item.weightKg} kg
        </p>
        {item.bodyFat && (
          <p className="text-slate-400 text-[11px] mt-0.5">Body Fat: {item.bodyFat}%</p>
        )}
      </div>
    );
  }
  return null;
};

export const WeightProgressChart: React.FC<WeightProgressChartProps> = ({ data }) => {
  const currentWeight = data.length > 0 ? data[data.length - 1].weightKg : 78.5;
  const initialWeight = data.length > 0 ? data[0].weightKg : 82.0;
  const lostKg = (initialWeight - currentWeight).toFixed(1);

  return (
    <Card className="p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-white tracking-tight">Weight Progression</h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/25">
              - {lostKg} kg Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Bodyweight trend over logged check-ins (Jan – Jun)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F1115] border border-[#232834]">
            <Scale className="w-4 h-4 text-[#C6FF3D]" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Current</span>
              <span className="text-sm font-black text-white">{currentWeight} kg</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-3.5 kg</span>
          </div>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C6FF3D" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#C6FF3D" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222734" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#222734' }}
            />
            <YAxis
              domain={['dataMin - 1', 'dataMax + 1']}
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="weightKg"
              stroke="#C6FF3D"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#weightGradient)"
              activeDot={{
                r: 6,
                fill: '#C6FF3D',
                stroke: '#0F1115',
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
