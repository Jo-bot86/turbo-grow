import { Plus } from 'lucide-react';
import { usePlants } from '../../hooks/usePlants';
import PlantListItem from './PlantListItem';
import { useNavigate } from 'react-router';

export default function PlantList() {
  const { plants, loading, error } = usePlants();
  const navigate = useNavigate();

  if (loading) return <p>Lade Pflanzen...</p>;

  if (error) return <p className='text-red-600'>{error}</p>;

  const handleCreate = () => {
    navigate(`/dashboard/kulturen/create`);
  };

  return (
    <div className='flex h-[calc(100vh-4rem)] bg-gray-50'>
      <div className='flex-1 p-8 ml-0 transition-all'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Kulturen</h1>
        <div className='flex sm:flex-row-reverse gap-2 pb-3'>
          <button
            onClick={handleCreate}
            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition'
          >
            <div className='flex '>
              <Plus className='mr-2' />
              <span className='sm:hidden'>Neu </span>
              <span className='hidden sm:block'>Neue Kultur anlegen </span>
            </div>
          </button>
        </div>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-4'>
          {plants
            .sort((plant1, plant2) =>
              plant1.variety.localeCompare(plant2.variety)
            )
            .map((plant) => (
              <PlantListItem key={plant.id} plant={plant} />
            ))}
        </ul>
      </div>
    </div>
  );
}
