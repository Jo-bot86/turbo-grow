import api from '../../api';
import type { PlantDTO, UpdatePlantDTO } from '../../types/plant/plantType';

export const plantService = {
  async getAllPlants(): Promise<PlantDTO[]> {
    const response = await api.get<PlantDTO[]>('/plant');
    return response.data;
  },

  async createPlant(plant: Partial<UpdatePlantDTO>): Promise<PlantDTO> {
    const response = await api.post<PlantDTO>('/plant', plant);
    return response.data;
  },

  async getPlantById(id: string): Promise<PlantDTO> {
    const response = await api.get<PlantDTO>(`/plant/${id}`);
    console.log(response.data);
    return response.data;
  },

  async updatePlant(
    id: string,
    updatePlantDTO: Partial<UpdatePlantDTO>
  ): Promise<PlantDTO> {
    const response = await api.put<PlantDTO>(`/plant/${id}`, updatePlantDTO);
    return response.data;
  },

  async deletePlant(id: string): Promise<PlantDTO> {
    const response = await api.delete<PlantDTO>(`/plant/${id}`);
    return response.data;
  },
};
