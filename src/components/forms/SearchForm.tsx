'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <form>
      <InputGroup>
        <InputGroupInput
          placeholder='Search...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        {searchValue && (
          <InputGroupAddon
            align='inline-end'
            className='cursor-pointer'
            onClick={() => setSearchValue('')}
          >
            <X />
          </InputGroupAddon>
        )}
      </InputGroup>
    </form>
  );
}
