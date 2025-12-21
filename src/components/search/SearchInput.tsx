import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ui/input-group';
import { Search } from '../animate-ui/icons/search';
import Filters from './Filters';
import { Button } from '../ui/button';
import Order from './Order';
import { BrushCleaning } from 'lucide-react';
import ClearAlll from './ClearAlll';

export default function SearchInput({
  handleChange,
  handleKeyPress,
  search,
  handleClick,
  placeholder,
  label,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  search: string;
  handleClick: () => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="md:max-w-[500px] max-w-[650px] w-full z-10 flex flex-col sm:flex-row gap-2 items-center">
      <InputGroup className=" border-gray-300 focus:ring-0 focus:border-gray-300  h-10 md:max-w-[500px] max-w-[612px] z-10 bg-background">
        <InputGroupInput
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={search}
        />
        <Button
          variant="purple"
          onClick={handleClick}
          className="w-auto h-full rounded-s-none px-4  dark:border-l-2 border-foreground "
        >
          <Search animateOnHover />
          {label}
        </Button>
      </InputGroup>
    </div>
  );
}
