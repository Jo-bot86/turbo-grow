import PlantForm from './PlantForm';

export default function PlantCreate() {
  return (
    <PlantForm
      plantDTO={{
        variety: '',
        name: '',
        genus: '',
        event: [],
        developmentDuration: '',
        germinationTemperature: {
          opt: null,
          min: null,
          max: null,
        },
        spacing: {
          rowSpacing: {
            min: null,
            max: null,
          },
          plantSpacing: {
            min: null,
            max: null,
          },
        },
        seedingDepth: {
          min: null,
          max: null,
        },
      }}
    />
  );
}
