import SearchInput from '@/components/atoms/SearchInput';
import { SearchIcon } from '@heroicons/react/solid';
import { FormEvent, FormEventHandler } from 'react';

type SearchBarProps = {
  onSubmit: FormEventHandler<Element>;
  changeSearchCriteria: (event: FormEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ onSubmit, changeSearchCriteria }: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex md:ml-0">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
          <SearchIcon className="shrink-0 h-5 w-5" aria-hidden="true" />
        </div>
        <SearchInput onChange={changeSearchCriteria} />
      </div>
    </form>
  );
};

export default SearchBar;
