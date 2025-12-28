import { useEffect, useState } from 'react';
import type { PlantDTO } from '../../api/types/plant/plantType';
import { plantService } from '../../api/service/plant/plantService';

export function usePlant(id: string) {
  const [plant, setPlant] = useState<PlantDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pflanze löschen
  const removePlant = async (id: string) => {
    try {
      await plantService.deletePlant(id);
      setPlant(null);
    } catch (err) {
      console.error(err);
      setError('Fehler beim Löschen der Pflanze.');
    }
  };

  const fetchPlantById = async (id: string) => {
    setLoading(true);
    try {
      const data = await plantService.getPlantById(id);
      setPlant(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError('Fehler beim Laden der Planze.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlantById(id);
  }, [id]);

  return { plant, setPlant, removePlant, loading, error };
}
