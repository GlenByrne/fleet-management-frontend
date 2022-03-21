import { FormEvent } from 'react';

type SearchInputProps = {
  onChange: (event: FormEvent<HTMLInputElement>) => void;
};

function SearchInput({ onChange }: SearchInputProps) {
  return (
    <input
      name="search-field"
      id="search-field"
      className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0"
      placeholder="Search"
      type="search"
      onChange={onChange}
    />
  );
}

export default SearchInput;
