import { useEffect, useState } from 'react';
import type { CreatePlantDTO } from '../../../api/types/plant/plantType';
import NumberInput from '../../util/inputs/NumberInput';
import { usePlants } from '../../hooks/usePlants';
import { parseDuration } from '../../util/fromatter/formatDuration';
import { useNavigate, useParams } from 'react-router';

interface PlantFormProps {
  plantDTO: CreatePlantDTO;
  editMode: boolean;
}

export default function PlantForm(props: PlantFormProps) {
  const { plantDTO, editMode } = props;
  const { germinationTemperature, spacing, seedingDepth } = plantDTO;
  const { rowSpacing, plantSpacing } = spacing;

  const { addPlant, editPlant } = usePlants();

  const [variety, setVariety] = useState(plantDTO.variety);
  const [name, setName] = useState(plantDTO.name);
  const [genus, setGenus] = useState(plantDTO.genus);

  const { id } = useParams<{ id: string }>();

  const [developmentDuration, setDevelopmentDuration] = useState(
    String(plantDTO.developmentDuration ?? '')
  );
  const [errorDevelopmentDuration, setErrorDevelopmentDuration] = useState<
    string | null
  >(null);

  const [optGerminationTemperature, setOptGerminationTemperature] = useState(
    String(germinationTemperature?.opt ?? '')
  );
  const [errorOptGerminationTemperature, setErrorOptGerminationTemperature] =
    useState<string | null>(null);

  const [minGerminationTemperature, setMinGerminationTemperature] = useState(
    String(germinationTemperature?.min ?? '')
  );
  const [errorMinGerminationTemperature, setErrorMinGerminationTemperature] =
    useState<string | null>(null);

  const [maxGerminationTemperature, setMaxGerminationTemperature] = useState(
    String(germinationTemperature?.max ?? '')
  );
  const [errorMaxGerminationTemperature, setErrorMaxGerminationTemperature] =
    useState<string | null>(null);

  const [minRowSpacing, setMinRowSpacing] = useState(
    String(rowSpacing?.min ?? '')
  );
  const [errorMinRowSpacing, setErrorMinRowSpacing] = useState<string | null>(
    null
  );

  const [maxRowSpacing, setMaxRowSpacing] = useState(
    String(rowSpacing?.max ?? '')
  );
  const [errorMaxRowSpacing, setErrorMaxRowSpacing] = useState<string | null>(
    null
  );

  const [minPlantSpacing, setMinPlantSpacing] = useState(
    String(plantSpacing?.min ?? '')
  );
  const [errorMinPlantSpacing, setErrorMinPlantSpacing] = useState<
    string | null
  >(null);

  const [maxPlantSpacing, setMaxPlantSpacing] = useState(
    String(plantSpacing?.max ?? '')
  );
  const [errorMaxPlantSpacing, setErrorMaxPlantSpacing] = useState<
    string | null
  >(null);

  const [minSeedingDepth, setMinSeedingDepth] = useState(
    String(seedingDepth?.min ?? '')
  );
  const [errorMinSeedingDepth, setErrorMinSeedingDepth] = useState<
    string | null
  >(null);

  const [maxSeedingDepth, setMaxSeedingDepth] = useState(
    String(seedingDepth?.max ?? '')
  );
  const [errorMaxSeedingDepth, setErrorMaxSeedingDepth] = useState<
    string | null
  >(null);

  const navigate = useNavigate();

  useEffect(() => {
    validateDevelopmentDuration();
    validateMinGerminationTemeperature();
    validateOptGerminationTemperature();
    validateMaxGerminationTemperature();
    validateMinRowSpacing();
    validateMaxRowSpacing();
    validateMinPlantSpacing();
    validateMaxPlantSpacing();
    validateMinSeedingDepth();
    validateMaxSeedingDepth();
  }, [
    developmentDuration,
    minGerminationTemperature,
    optGerminationTemperature,
    maxGerminationTemperature,
    minRowSpacing,
    maxRowSpacing,
    minPlantSpacing,
    maxPlantSpacing,
    minSeedingDepth,
    maxSeedingDepth,
  ]);

  function validateDevelopmentDuration() {
    if (developmentDuration !== '' && !isInteger(developmentDuration)) {
      setErrorDevelopmentDuration(
        'Bitte geben Sie einen validen Zeitraum in Tagen an'
      );
    } else {
      setErrorDevelopmentDuration(null);
    }
  }

  function validateMinGerminationTemeperature() {
    if (
      minGerminationTemperature !== '' &&
      !isCommaNumber(minGerminationTemperature)
    ) {
      setErrorMinGerminationTemperature(
        'Bitte geben Sie eine valide minimale Keimtermeratur an'
      );
    } else if (
      (maxGerminationTemperature || optGerminationTemperature) &&
      isCommaNumber(minGerminationTemperature) &&
      (isLess(maxGerminationTemperature, minGerminationTemperature) ||
        isLess(optGerminationTemperature, minGerminationTemperature))
    ) {
      setErrorMinGerminationTemperature(
        'Die minimale Keimtemperatur muss kleiner oder gleich der optimalen und der maximalen Keimtemperatur sein.'
      );
    } else {
      setErrorMinGerminationTemperature(null);
    }
  }

  function validateOptGerminationTemperature() {
    if (
      optGerminationTemperature !== '' &&
      !isCommaNumber(optGerminationTemperature)
    ) {
      setErrorOptGerminationTemperature(
        'Bitte geben Sie eine valide optimale Keimtermeratur an'
      );
    } else if (
      (maxGerminationTemperature || minGerminationTemperature) &&
      isCommaNumber(optGerminationTemperature) &&
      (isLess(maxGerminationTemperature, optGerminationTemperature) ||
        isGreater(minGerminationTemperature, optGerminationTemperature))
    ) {
      setErrorOptGerminationTemperature(
        'Die optimale Keimtemperatur muss größer oder gleich der minimalen und kleiner oder gleich der maximalen Keimtemperatur sein.'
      );
    } else {
      setErrorOptGerminationTemperature(null);
    }
  }

  function validateMaxGerminationTemperature() {
    if (
      maxGerminationTemperature !== '' &&
      !isCommaNumber(maxGerminationTemperature)
    ) {
      setErrorMaxGerminationTemperature(
        'Bitte geben Sie eine valide maximale Keimtermeratur an'
      );
    } else if (
      (minGerminationTemperature || optGerminationTemperature) &&
      isCommaNumber(maxGerminationTemperature) &&
      (isGreater(minGerminationTemperature, maxGerminationTemperature) ||
        isGreater(optGerminationTemperature, maxGerminationTemperature))
    ) {
      setErrorMaxGerminationTemperature(
        'Die maximale Keimtemperatur muss größer oder gleich der optimalen und der minimalen Keimtemperatur sein.'
      );
    } else {
      setErrorMaxGerminationTemperature(null);
    }
  }

  function validateMinRowSpacing() {
    if (minRowSpacing !== '' && !isCommaNumber(minRowSpacing)) {
      setErrorMinRowSpacing(
        'Bitte geben Sie einen validen minimalen Reihenabstand an'
      );
    } else if (
      maxRowSpacing &&
      isCommaNumber(minRowSpacing) &&
      isLess(maxRowSpacing, minRowSpacing)
    ) {
      setErrorMinRowSpacing(
        'Der minimale Reihenabstand muss kleiner oder gleich dem maximalen sein'
      );
    } else {
      setErrorMinRowSpacing(null);
    }
  }

  function validateMaxRowSpacing() {
    if (maxRowSpacing !== '' && !isCommaNumber(maxRowSpacing)) {
      setErrorMaxRowSpacing(
        'Bitte geben Sie einen validen minimalen Reihenabstand an'
      );
    } else if (
      minRowSpacing &&
      isCommaNumber(maxRowSpacing) &&
      isGreater(minRowSpacing, maxRowSpacing)
    ) {
      setErrorMaxRowSpacing(
        'Der maximale Reihenabstand muss größer oder gleich dem minimalen sein'
      );
    } else {
      setErrorMaxRowSpacing(null);
    }
  }

  function validateMinPlantSpacing() {
    if (minPlantSpacing !== '' && !isCommaNumber(minPlantSpacing)) {
      setErrorMinPlantSpacing(
        'Bitte geben Sie einen validen minimalen Pflanzenabstand an'
      );
    } else if (
      maxPlantSpacing &&
      isCommaNumber(minPlantSpacing) &&
      isLess(maxPlantSpacing, minPlantSpacing)
    ) {
      setErrorMinPlantSpacing(
        'Der minimale Pflanzabstand muss kleiner oder gleich dem maximalen sein'
      );
    } else {
      setErrorMinPlantSpacing(null);
    }
  }

  function validateMaxPlantSpacing() {
    if (maxPlantSpacing !== '' && !isCommaNumber(maxPlantSpacing)) {
      setErrorMaxPlantSpacing(
        'Bitte geben Sie einen validen maximalen Pflanzabstand an'
      );
    } else if (
      minPlantSpacing &&
      isCommaNumber(maxPlantSpacing) &&
      isGreater(minPlantSpacing, maxPlantSpacing)
    ) {
      setErrorMaxPlantSpacing(
        'Der maximale Pflanzabstand muss größer oder gleich dem minimalen sein'
      );
    } else {
      setErrorMaxPlantSpacing(null);
    }
  }

  function validateMinSeedingDepth() {
    if (minSeedingDepth !== '' && !isCommaNumber(minSeedingDepth)) {
      setErrorMinSeedingDepth(
        'Bitte geben Sie eine valide minimale Saattiefe an'
      );
    } else if (
      maxSeedingDepth &&
      isCommaNumber(minSeedingDepth) &&
      isLess(maxSeedingDepth, minSeedingDepth)
    ) {
      setErrorMinSeedingDepth(
        'Die minimale Saattiefe muss kleiner oder gleich der maximalen sein'
      );
    } else {
      setErrorMinSeedingDepth(null);
    }
  }

  function validateMaxSeedingDepth() {
    if (maxSeedingDepth !== '' && !isCommaNumber(maxSeedingDepth)) {
      setErrorMaxSeedingDepth(
        'Bitte geben Sie eine valide maximale Saattiefe an'
      );
    } else if (
      minSeedingDepth &&
      isCommaNumber(maxSeedingDepth) &&
      isGreater(minSeedingDepth, maxSeedingDepth)
    ) {
      setErrorMaxSeedingDepth(
        'Die maximale Saattiefe muss größer oder gleich der minimalen sein'
      );
    } else {
      setErrorMaxSeedingDepth(null);
    }
  }

  const handlePlantCreate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      errorDevelopmentDuration ||
      errorOptGerminationTemperature ||
      errorMinGerminationTemperature ||
      errorMaxGerminationTemperature ||
      errorMinRowSpacing ||
      errorMaxRowSpacing ||
      errorMinPlantSpacing ||
      errorMaxPlantSpacing ||
      errorMinSeedingDepth ||
      errorMaxSeedingDepth
    ) {
      return;
    } else {
      if (!editMode) {
         addPlant({
          variety: variety,
          name: name,
          genus: genus,
          developmentDuration: parseDuration(developmentDuration),
          germinationTemperature: {
            opt: Number(optGerminationTemperature.replace(',', '.')),
            min: Number(minGerminationTemperature.replace(',', '.')),
            max: Number(maxGerminationTemperature.replace(',', '.')),
          },
          spacing: {
            rowSpacing: {
              min: Number(minRowSpacing.replace(',', '.')),
              max: Number(maxRowSpacing.replace(',', '.')),
            },
            plantSpacing: {
              min: Number(minPlantSpacing.replace(',', '.')),
              max: Number(maxPlantSpacing.replace(',', '.')),
            },
          },
          seedingDepth: {
            min: Number(minSeedingDepth.replace(',', '.')),
            max: Number(maxSeedingDepth.replace(',', '.')),
          },
          events: [],
        });
      } else {
        editPlant(id ?? '', {
          variety: variety,
          name: name,
          genus: genus,
          developmentDuration: parseDuration(developmentDuration),
          germinationTemperature: {
            opt: Number(optGerminationTemperature.replace(',', '.')),
            min: Number(minGerminationTemperature.replace(',', '.')),
            max: Number(maxGerminationTemperature.replace(',', '.')),
          },
          spacing: {
            rowSpacing: {
              min: Number(minRowSpacing.replace(',', '.')),
              max: Number(maxRowSpacing.replace(',', '.')),
            },
            plantSpacing: {
              min: Number(minPlantSpacing.replace(',', '.')),
              max: Number(maxPlantSpacing.replace(',', '.')),
            },
          },
          seedingDepth: {
            min: Number(minSeedingDepth.replace(',', '.')),
            max: Number(maxSeedingDepth.replace(',', '.')),
          },
          events: [],
        });
      }
      navigate(`/dashboard/kulturen/${id}`);
    }
  };

  return (
    <form className=' '>
      <h1 className='text-3xl font-bold mb-6 p-6 ml-0 '>
        Erstelle eine neue Kultur
      </h1>
      <div className='mb-6'>
        <div className=''>
          <div className='mb-2 border border-gray-300 rounded-xl p-3 md:p-0 md:border-none'>
            <label className='block text-gray-500 text-xl font-bold pr-4 md:hidden'>
              Grunddaten
            </label>
            <div className='mb-2'>
              <label
                className='block text-gray-500 font-bold  mb-1 md:mb-0 pr-4'
                htmlFor='sorte'
              >
                Sorte
              </label>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500'
                id='sorte'
                type='text'
                value={variety}
                onChange={(e) => setVariety(e.currentTarget.value)}
                required
                placeholder='Westländer Winter'
              />
            </div>
            <div className='mb-2'>
              <label
                className='block text-gray-500 font-bold  mb-1 md:mb-0 pr-4'
                htmlFor='inline-full-name'
              >
                Name
              </label>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500'
                id='inline-full-name'
                type='text'
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
                placeholder='Grünkohl'
              />
            </div>
            <div className='mb-2'>
              <label
                className='block text-gray-500 font-bold mb-1 md:mb-0 pr-4'
                htmlFor='inline-full-name'
              >
                Gattung
              </label>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500'
                id='inline-full-name'
                type='text'
                value={genus}
                onChange={(e) => setGenus(e.currentTarget.value)}
                required
                placeholder='Kohl'
              />
            </div>
          </div>
          <div className='mb-2 border border-gray-300 rounded-xl p-3 md:p-0 md:border-none'>
            <NumberInput
              id={'developmentDuration'}
              label={'Entwicklung (in Tagen)'}
              error={errorDevelopmentDuration}
              value={developmentDuration}
              onChange={(e) => setDevelopmentDuration(e.currentTarget.value)}
            />
          </div>
          <div className='mb-2 border border-gray-300 rounded-xl p-3 md:p-0 md:border-none'>
            <label className='block text-gray-500 text-xl md:text-lg font-bold pr-4'>
              Keimtemperatur (in °C)
            </label>
            <div className='grid md:grid-cols-3 gap-4'>
              <NumberInput
                id={'minGerminationTemperature'}
                label={'Min'}
                error={errorMinGerminationTemperature}
                value={minGerminationTemperature}
                onChange={(e) =>
                  setMinGerminationTemperature(e.currentTarget.value)
                }
              />
              <NumberInput
                id={'optGerminationTemperature'}
                label={'Opt'}
                error={errorOptGerminationTemperature}
                value={optGerminationTemperature}
                onChange={(e) =>
                  setOptGerminationTemperature(e.currentTarget.value)
                }
              />
              <NumberInput
                id={'maxGerminationTemperature'}
                label={'Max'}
                error={errorMaxGerminationTemperature}
                value={maxGerminationTemperature}
                onChange={(e) =>
                  setMaxGerminationTemperature(e.currentTarget.value)
                }
              />
            </div>
          </div>

          <div className='mb-2 border border-gray-300 rounded-xl p-3 md:p-0 md:border-none'>
            <label className='block text-gray-500 text-xl md:text-lg font-bold mb-1 md:mb-0 pr-4'>
              Reihenabstand (in cm)
            </label>
            <div className='grid md:grid-cols-3 gap-4'>
              <NumberInput
                id={'minRowSpacing'}
                label={'Min'}
                error={errorMinRowSpacing}
                value={minRowSpacing}
                onChange={(e) => setMinRowSpacing(e.currentTarget.value)}
              />
              <NumberInput
                id={'maxRowSpacing'}
                label={'Max'}
                error={errorMaxRowSpacing}
                value={maxRowSpacing}
                onChange={(e) => setMaxRowSpacing(e.currentTarget.value)}
              />
            </div>
          </div>

          <div className='mb-2 border border-gray-300 rounded-xl p-3 md:p-0 md:border-none'>
            <label className='block text-gray-500 text-xl md:text-lg font-bold mb-1 md:mb-0 pr-4'>
              Pflanzabstand (in cm)
            </label>
            <div className='grid md:grid-cols-3 gap-4'>
              <NumberInput
                id={'minPlantSpacing'}
                label={'Min'}
                error={errorMinPlantSpacing}
                value={minPlantSpacing}
                onChange={(e) => setMinPlantSpacing(e.currentTarget.value)}
              />
              <NumberInput
                id={'maxPlantSpacing'}
                label={'Max'}
                error={errorMaxPlantSpacing}
                value={maxPlantSpacing}
                onChange={(e) => setMaxPlantSpacing(e.currentTarget.value)}
              />
            </div>
          </div>

          <div className='mb-2 border border-gray-300 rounded-xl p-3 md:p-0 md:border-none'>
            <label className='block text-gray-500 text-xl md:text-lg font-bold mb-1 md:mb-0 pr-4'>
              Saattiefe (in cm)
            </label>
            <div className='grid md:grid-cols-3 gap-4'>
              <NumberInput
                id={'minSeedingDepth'}
                label={'Min'}
                error={errorMinSeedingDepth}
                value={minSeedingDepth}
                onChange={(e) => setMinSeedingDepth(e.currentTarget.value)}
              />
              <NumberInput
                id={'maxSeedingDepth'}
                label={'Max'}
                error={errorMaxSeedingDepth}
                value={maxSeedingDepth}
                onChange={(e) => setMaxSeedingDepth(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          className='bg-green-700 hover:bg-green-500 text-white w-full sm:w-1/2 md:w-1/3 xl:w-1/4 font-bold py-2 px-4 border border-blue-700 rounded'
          onClick={(e) => handlePlantCreate(e)}
        >
          Kultur speichern
        </button>
      </div>
    </form>
  );
}

function isLess(a: string, b: string): boolean {
  const na = toNum(a);
  const nb = toNum(b);
  if (na === null || nb === null) return false;
  return na < nb;
}

function isGreater(a: string, b: string): boolean {
  const na = toNum(a);
  const nb = toNum(b);
  if (na === null || nb === null) return false;
  return na > nb;
}

/** Wandelt "2,5" oder "2.5" → 2.5 */
function toNum(value: string): number | null {
  if (typeof value !== 'string') return null;
  const s = value.replace(',', '.').trim();
  if (s === '' || isNaN(Number(s))) return null;
  return Number(s);
}

/** Erlaubt Ganzzahl oder Dezimalzahl mit Komma */
function isCommaNumber(value: string): boolean {
  return /^-?\d+([.,]\d+)?$/.test(value.trim());
}

/** Erlaubt ganze Zahlen */
function isInteger(value: string): boolean {
  return /^-?\d+$/.test(value.trim());
}
