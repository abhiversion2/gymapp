import { useState, useEffect, useCallback } from 'react';
import type { BodyMeasurement } from '../types/models';
import { getMeasurements, addMeasurement } from '../services/measurements';

export function useMeasurements() {
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMeasurements();
      setMeasurements(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddMeasurement = async (input: Omit<BodyMeasurement, 'id'>) => {
    const created = await addMeasurement(input);
    setMeasurements((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    return created;
  };

  const latest = measurements[0] || null;
  const previous = measurements[1] || null;

  const weightDiff = latest && previous ? latest.weightKg - previous.weightKg : 0;
  const bodyFatDiff = latest && previous ? latest.bodyFatPercentage - previous.bodyFatPercentage : 0;

  return {
    measurements,
    latest,
    previous,
    weightDiff,
    bodyFatDiff,
    loading,
    isAddModalOpen,
    setIsAddModalOpen,
    handleAddMeasurement,
    refreshMeasurements: loadData,
  };
}
