import React from 'react';
import { Sparkles } from 'lucide-react';
import { MeasurementSummaryCard } from '../components/measurements/MeasurementSummaryCard';
import { MeasurementHistoryTable } from '../components/measurements/MeasurementHistoryTable';
import { AddMeasurementModal } from '../components/measurements/AddMeasurementModal';
import { LoadingState } from '../components/common/LoadingState';
import { useMeasurements } from '../hooks/useMeasurements';
import { useApp } from '../context/AppContext';

export const MeasurementsPage: React.FC = () => {
  const {
    measurements,
    latest,
    previous,
    loading,
    isAddModalOpen,
    setIsAddModalOpen,
    handleAddMeasurement,
  } = useMeasurements();

  const { addToast } = useApp();

  const onSave = async (data: Parameters<typeof handleAddMeasurement>[0]) => {
    const created = await handleAddMeasurement(data);
    addToast({
      title: 'Measurement Recorded',
      message: `Logged ${created.weightKg} kg on ${created.date}`,
      type: 'success',
    });
  };

  if (loading) {
    return <LoadingState message="Loading anthropometric data..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
            <Sparkles className="w-3 h-3" />
            Body Composition
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Body Measurements & Stats
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Record circumferences and body mass indicators to accurately measure lean muscle growth.
        </p>
      </div>

      {/* Main Measurement Cards */}
      <MeasurementSummaryCard
        latest={latest}
        previous={previous}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Measurement History Log Table */}
      <MeasurementHistoryTable measurements={measurements} />

      {/* Add Measurement Modal Form */}
      <AddMeasurementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onSave}
      />
    </div>
  );
};
