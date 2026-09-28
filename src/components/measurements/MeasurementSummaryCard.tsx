import React from 'react';
import {
  Scale,
  Ruler,
  Percent,
  Plus,
  Activity,
  Calendar,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import type { BodyMeasurement } from '../../types/models';

export interface MeasurementSummaryCardProps {
  latest: BodyMeasurement | null;
  previous: BodyMeasurement | null;
  onOpenAddModal: () => void;
}

export const MeasurementSummaryCard: React.FC<MeasurementSummaryCardProps> = ({
  latest,
  previous,
  onOpenAddModal,
}) => {
  if (!latest) return null;

  const statItems = [
    {
      label: 'Weight',
      value: `${latest.weightKg} kg`,
      diff: previous ? (latest.weightKg - previous.weightKg).toFixed(1) : null,
      icon: <Scale className="w-5 h-5 text-[#C6FF3D]" />,
      invertDiff: true, // weight loss is usually good
    },
    {
      label: 'Body Fat',
      value: `${latest.bodyFatPercentage}%`,
      diff: previous ? (latest.bodyFatPercentage - previous.bodyFatPercentage).toFixed(1) : null,
      icon: <Percent className="w-5 h-5 text-amber-400" />,
      invertDiff: true,
    },
    {
      label: 'Height',
      value: `${latest.heightCm} cm`,
      icon: <Ruler className="w-5 h-5 text-cyan-400" />,
    },
    {
      label: 'Chest',
      value: `${latest.chestCm} cm`,
      diff: previous ? (latest.chestCm - previous.chestCm).toFixed(1) : null,
      icon: <Activity className="w-5 h-5 text-purple-400" />,
    },
    {
      label: 'Waist',
      value: `${latest.waistCm} cm`,
      diff: previous ? (latest.waistCm - previous.waistCm).toFixed(1) : null,
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      invertDiff: true,
    },
    {
      label: 'Arms',
      value: `${latest.armsCm} cm`,
      diff: previous ? (latest.armsCm - previous.armsCm).toFixed(1) : null,
      icon: <Activity className="w-5 h-5 text-rose-400" />,
    },
    {
      label: 'Thigh',
      value: `${latest.thighCm} cm`,
      diff: previous ? (latest.thighCm - previous.thighCm).toFixed(1) : null,
      icon: <Activity className="w-5 h-5 text-indigo-400" />,
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight">Current Body Composition</h3>
            <span className="flex items-center gap-1 text-xs text-slate-400 bg-[#0F1115] px-2.5 py-1 rounded-lg border border-[#232834]">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {latest.date}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track circumferences and physical transformation over time
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onOpenAddModal}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-[0_0_20px_rgba(198,255,61,0.25)]"
        >
          Add Measurement
        </Button>
      </div>

      {/* Grid of measurement values */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-xl bg-[#0F1115] border border-[#232834] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </span>
              <div className="p-1.5 rounded-lg bg-[#191D26] border border-[#242A38]">
                {item.icon}
              </div>
            </div>

            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                {item.value}
              </span>

              {item.diff && Number(item.diff) !== 0 && (
                <span
                  className={`text-[11px] font-bold ${
                    (Number(item.diff) > 0 && !item.invertDiff) ||
                    (Number(item.diff) < 0 && item.invertDiff)
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {Number(item.diff) > 0 ? `+${item.diff}` : item.diff}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {latest.notes && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#171B24] border border-[#242A38] text-xs text-slate-300">
          <strong className="text-white">Trainer / Member Notes:</strong> {latest.notes}
        </div>
      )}
    </Card>
  );
};
