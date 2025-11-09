import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router';
import type { PlantDTO } from '../../../api/types/plant/plantType';

interface PlantDetailProps {
  plant: PlantDTO;
}
export default function PlantListItem(props: PlantDetailProps) {
  const navigate = useNavigate();
  const { plant } = props;

  const handleShowPlantDetail = (plant: PlantDTO) => {
    navigate(`/dashboard/kulturen/${plant.id}`)
  }

  return (
    <Fragment>
      <li className='flex'>
        <div
          className={`border-2 border-solid rounded-xl shadow-sm flex-1 p-4 bg-white hover:shadow-lg transition ease-in-out duration-150 hover:-translate-y-1`}
          onClick={() => handleShowPlantDetail(plant)}
        >
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>
            {plant.variety}
          </h3>
          <p className='text-sm text-gray-500'>{plant.name}</p>
        </div>
      </li>
    </Fragment>
  );
}
