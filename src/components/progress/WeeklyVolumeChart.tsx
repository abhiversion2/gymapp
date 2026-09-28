import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Flame } from 'lucide-react';
import { Card } from '../common/Card';

export interface WeeklyVolumeChartProps {
  data: { day: string; workouts: number; calories: number; minutes: number }[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { day: string; calories: number; minutes: number; workouts: number } }>;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl bg-[#13161D] border border-[#2F374A] p-3 shadow-2xl text-xs space-y-1">
        <p className="font-bold text-white">{item.day}</p>
        <p className="text-amber-400 font-extrabold text-sm">{item.calories} kcal</p>
        <p className="text-slate-400 text-[11px]">
          {item.workouts > 0 ? `${item.minutes} min active session` : 'Rest day'}
        </p>
      </div>
    );
  }
  return null;
};

export const WeeklyVolumeChart: React.FC<WeeklyVolumeChartProps> = ({ data }) => {
  const totalWeeklyCalories = data.reduce((acc, curr) => acc + curr.calories, 0);

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-white tracking-tight">Calories Burned</h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25">
              Weekly Burn
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Energy expenditure across days of the week</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F1115] border border-[#232834]">
          <Flame className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-300">
            Total:{' '}
            <strong className="text-white text-sm font-bold ml-1">
              {totalWeeklyCalories.toLocaleString()} kcal
            </strong>
          </span>
        </div>
      </div>

      <div className="w-full h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222734" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#222734' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
            <Bar
              dataKey="calories"
              fill="#F59E0B"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
