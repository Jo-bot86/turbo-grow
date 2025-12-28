import type { ChangeEvent } from 'react';

interface NumberInputProps {
  id: string;
  label: string;
  value: string;
  error: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function NumberInput(props: NumberInputProps) {
  const { id, label, error, value, onChange } = props;

  return (
    <div id={id}>
      <label
        className='block text-gray-500 font-bold mb-1 md:mb-0 pr-4'
        htmlFor={`${id}Input`}
      >
        {label}
      </label>{' '}
      <input
        id={`${id}Input`}
        className={`bg-gray-200 appearance-none border-2 ${
          error ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
        } rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white`}
        type='text'
        value={value}
        onChange={onChange}
      />
      {error && <p className='text-red-500 text-xs italic'>{error}</p>}
    </div>
  );
}
