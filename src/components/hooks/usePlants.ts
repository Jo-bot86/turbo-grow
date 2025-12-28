// src/hooks/usePlants.ts
import { useCallback, useEffect, useState } from 'react';
import { plantService } from '../../api/service/plant/plantService';
import type { PlantDTO, UpdatePlantDTO } from '../../api/types/plant/plantType';

export function usePlants() {
  const [plants, setPlants] = useState<PlantDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Laden aller Plants
  const fetchPlants = useCallback(async () => {
    setLoading(true);
    try {
      const data = await plantService.getAllPlants();
      setPlants(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Fehler beim Laden der Pflanzen.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Neue Pflanze erstellen
  const addPlant = async (plant: Partial<UpdatePlantDTO>) =>  {
    try {
      const newPlant = await plantService.createPlant(plant);
      setPlants((prev) => [...prev, newPlant]);
      return newPlant.id;
    } catch (err) {
      console.error(err);
      setError('Fehler beim Anlegen der Pflanze.');
    }
  };

  // Pflanze aktualisieren
  const editPlant = async (id: string, updated: Partial<UpdatePlantDTO>) => {
    try {
      const saved = await plantService.updatePlant(id, updated);
      setPlants((prev) =>
        prev.map((p) => (Number(p.id) === Number(id) ? saved : p))
      );
    } catch (err) {
      console.error(err);
      setError('Fehler beim Aktualisieren der Pflanze.');
    }
  };

  // Pflanze löschen
  const removePlant = async (id: string) => {
    try {
      await plantService.deletePlant(id);
      setPlants((prev) => prev.filter((p) => Number(p.id) !== Number(id)));
    } catch (err) {
      console.error(err);
      setError('Fehler beim Löschen der Pflanze.');
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return {
    plants,
    loading,
    error,
    refresh: fetchPlants,
    addPlant,
    editPlant,
    removePlant,
  };
}
