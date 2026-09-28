import React from 'react';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { Card } from '../common/Card';
import type { PersonalRecord } from '../../types/models';

export interface PersonalRecordsListProps {
  records: PersonalRecord[];
}

export const PersonalRecordsList: React.FC<PersonalRecordsListProps> = ({ records }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-white tracking-tight">Personal Records (PRs)</h4>
            <span className="p-1 rounded-md bg-[#C6FF3D]/10 text-[#C6FF3D]">
              <Trophy className="w-4 h-4 fill-current" />
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">All-time maximum lifts achieved</p>
        </div>

        <span className="text-xs font-semibold text-slate-400">
          {records.length} Verified PRs
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {records.map((pr) => {
          const improvement = pr.previousRecord
            ? (pr.recordValue - pr.previousRecord).toFixed(1)
            : null;

          return (
            <div
              key={pr.id}
              className="p-4 rounded-xl bg-[#0F1115] border border-[#232834] hover:border-[#C6FF3D]/40 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {pr.muscle}
                  </span>
                  <h5 className="text-sm font-bold text-white group-hover:text-[#C6FF3D] transition-colors">
                    {pr.exerciseName}
                  </h5>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#1F2533] border border-[#2B3448] flex items-center justify-center text-[#C6FF3D]">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C212B] mt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-white tabular-nums">
                    {pr.recordValue}
                  </span>
                  <span className="text-xs font-bold text-[#C6FF3D] ml-1">{pr.unit}</span>
                </div>

                {improvement && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{improvement} kg</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
