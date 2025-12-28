import PlantForm from './PlantForm';

export default function PlantCreate() {
  return (
    <PlantForm
      plantDTO={{
        variety: '',
        name: '',
        genus: '',
        developmentDuration: '',
        germinationTemperature: {
          opt: undefined,
          min: undefined,
          max: undefined,
        },
        spacing: {
          rowSpacing: {
            min: undefined,
            max: undefined,
          },
          plantSpacing: {
            min: undefined,
            max: undefined,
          },
        },
        seedingDepth: {
          min: undefined,
          max: undefined,
        },
      }}
      editMode={false}
    />
  );
}
