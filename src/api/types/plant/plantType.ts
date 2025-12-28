import type { EventDTO } from '../event/eventType';

export interface CreatePlantDTO {
  variety: string;
  name: string;
  genus: string;
  developmentDuration: string | null;
  germinationTemperature?: {
    opt?: number;
    min?: number;
    max?: number;
  };
  spacing: SpacingDTO;
  seedingDepth?: RangeCmDTO;
}

export interface UpdatePlantDTO extends CreatePlantDTO {
  events: EventDTO[];
}

export interface PlantDTO extends UpdatePlantDTO {
  id: number;
}

export interface SpacingDTO {
  rowSpacing?: RangeCmDTO;
  plantSpacing?: RangeCmDTO;
}

export interface RangeCmDTO {
  min?: number;
  max?: number;
}
