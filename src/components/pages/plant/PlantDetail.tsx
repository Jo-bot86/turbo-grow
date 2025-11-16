import { useNavigate, useParams } from 'react-router';
import { usePlant } from '../../hooks/usePlant';
import LoadingSpinner from '../../util/LoadingSpinner';
import { formatDuration } from '../../util/fromatter/formatDuration';

export default function PlantDetail() {
  const { id } = useParams();
  const { plant, loading, error, removePlant } = usePlant(id ? id : '');
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error) return <p className='text-red-600'>{error}</p>;
  if (!plant) return <p>Keine Pflanze gefunden</p>;

  const handleEdit = () => {
    navigate(`/dashboard/kulturen/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Willst du die Pflanze "${plant.variety}" wirklich löschen?`
    );
    if (!confirmed) return;

    await removePlant(String(id));
    navigate('/dashboard/kulturen');
  };

  return (
    <>
      <div className='p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-md'>
        {/* Header */}
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-1'>
              {plant.variety}
            </h1>
            <p className='text-gray-500'>
              {plant.name} ({plant.genus})
            </p>
          </div>

          {/* Buttons */}
          <div className='flex gap-2'>
            <button
              onClick={handleEdit}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            >
              Bearbeiten
            </button>
            <button
              onClick={handleDelete}
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
            >
              Löschen
            </button>
          </div>
        </div>

        {/* Details */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6'>
          <div>
            <h3 className='text-sm font-semibold text-gray-500 uppercase mb-1'>
              Entwicklung
            </h3>
            <p className='text-gray-800'>
              {formatDuration(plant.developmentDuration)}
            </p>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-gray-500 uppercase mb-1'>
              Keimtemperatur
            </h3>
            <p className='text-gray-800'>
              {plant.germinationTemperature
                ? `Optimal: ${plant.germinationTemperature.opt}°C,
              Min: ${plant.germinationTemperature?.min}°C,
              Max: ${plant.germinationTemperature?.max}°C`
                : '-'}
            </p>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-gray-500 uppercase mb-1'>
              Abstand
            </h3>
            <p className='text-gray-800'>
              Zwischen Pflanzen: Min: {plant.spacing.plantSpacing?.min} cm, Max:{' '}
              {plant.spacing.plantSpacing?.max} cm
              <br />
              Zwischen Reihen: Min: {plant.spacing.rowSpacing?.min} cm, Max:{' '}
              {plant.spacing.rowSpacing?.max} cm
            </p>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-gray-500 uppercase mb-1'>
              Saattiefe
            </h3>
            <p className='text-gray-800'>
              Min: {plant.seedingDepth?.min} cm, Max: {plant.seedingDepth?.max}{' '}
              cm
            </p>
          </div>

          <div className='sm:col-span-2'>
            <h3 className='text-sm font-semibold text-gray-500 uppercase mb-1'>
              Events
            </h3>
            {plant.events?.length > 0 ? (
              <ul className='text-gray-800 list-disc pl-5'>
                {plant.events.map((e, i) => (
                  <li key={i}>
                    {`Event`} – {new Date().toLocaleDateString()} {e.id}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-800'>Keine Events vorhanden.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
