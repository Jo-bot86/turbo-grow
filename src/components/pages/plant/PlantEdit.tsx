import { useParams } from 'react-router';
import PlantForm from './PlantForm';
import { usePlant } from '../../hooks/usePlant';
import LoadingSpinner from '../../util/LoadingSpinner';
import { formatDuration } from '../../util/fromatter/formatDuration';

export default function PlantEdit() {
  const { id } = useParams<{ id: string }>();

  const { plant } = usePlant(id ?? '');

  if (!plant) {
    return <LoadingSpinner />;
  }

  return (
    <PlantForm
      plantDTO={{
        variety: plant.variety,
        name: plant.name,
        genus: plant.genus,
        developmentDuration: formatDuration(plant.developmentDuration, false),
        germinationTemperature: {
          opt: plant.germinationTemperature?.opt,
          min: plant.germinationTemperature?.min,
          max: plant.germinationTemperature?.max,
        },
        spacing: {
          rowSpacing: {
            min: plant.spacing.rowSpacing?.min,
            max: plant.spacing.rowSpacing?.max,
          },
          plantSpacing: {
            min: plant.spacing.plantSpacing?.min,
            max: plant.spacing.plantSpacing?.max,
          },
        },
        seedingDepth: {
          min: plant.seedingDepth?.min,
          max: plant.seedingDepth?.max,
        },
      }}
      editMode={true}
    />
  );
}
