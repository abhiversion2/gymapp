import React from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '../common/Card';
import type { BodyMeasurement } from '../../types/models';

export interface MeasurementHistoryTableProps {
  measurements: BodyMeasurement[];
}

export const MeasurementHistoryTable: React.FC<MeasurementHistoryTableProps> = ({
  measurements,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-bold text-white tracking-tight">Measurement Log</h4>
          <p className="text-xs text-slate-400 mt-0.5">Comprehensive history of your physical entries</p>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {measurements.length} Logged Entries
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#232834] text-slate-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 px-3">Date</th>
              <th className="pb-3 px-3">Weight</th>
              <th className="pb-3 px-3">Body Fat</th>
              <th className="pb-3 px-3">Chest</th>
              <th className="pb-3 px-3">Waist</th>
              <th className="pb-3 px-3">Arms</th>
              <th className="pb-3 px-3">Thigh</th>
              <th className="pb-3 px-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C212B]">
            {measurements.map((m) => (
              <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-semibold text-white whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {m.date}
                  </div>
                </td>
                <td className="py-3.5 px-3 font-extrabold text-[#C6FF3D] whitespace-nowrap">
                  {m.weightKg} kg
                </td>
                <td className="py-3.5 px-3 font-medium text-amber-400 whitespace-nowrap">
                  {m.bodyFatPercentage}%
                </td>
                <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">{m.chestCm} cm</td>
                <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">{m.waistCm} cm</td>
                <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">{m.armsCm} cm</td>
                <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">{m.thighCm} cm</td>
                <td className="py-3.5 px-3 text-slate-400 max-w-xs truncate">{m.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {measurements.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-xl bg-[#0F1115] border border-[#232834] space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {m.date}
              </span>
              <span className="text-base font-extrabold text-[#C6FF3D]">{m.weightKg} kg</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs border-y border-[#1F2533] py-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Body Fat</span>
                <span className="font-semibold text-amber-400">{m.bodyFatPercentage}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Waist</span>
                <span className="font-semibold text-slate-200">{m.waistCm} cm</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Arms</span>
                <span className="font-semibold text-slate-200">{m.armsCm} cm</span>
              </div>
            </div>

            {m.notes && <p className="text-[11px] text-slate-400 line-clamp-2">{m.notes}</p>}
          </div>
        ))}
      </div>
    </Card>
  );
};
