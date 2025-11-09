import type { EventDTO } from '../event/eventType';

export interface UpdatePlantDTO {
  variety: string;
  name: string;
  genus: string;
  event: EventDTO[];
  developmentDuration: string | null;
  germinationTemperature: {
    opt: number | null;
    min: number | null;
    max: number | null;
  };
  spacing: SpacingDTO;
  seedingDepth: RangeCmDTO;
}

export interface PlantDTO extends UpdatePlantDTO {
  id: number;
}

export interface SpacingDTO {
  rowSpacing: RangeCmDTO;
  plantSpacing: RangeCmDTO;
}

export interface RangeCmDTO {
  min: number | null;
  max: number | null;
}
