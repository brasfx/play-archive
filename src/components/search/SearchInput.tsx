import React from 'react';
import { InputGroup, InputGroupInput } from '@/ui/input-group';
import { Search } from '../animate-ui/icons/search';
import { Button } from '../ui/button';

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
    <div className="md:max-w-[500px] max-w-[650px] w-full z-10 flex flex-col md:flex-row gap-2 items-center">
      <InputGroup className="border-gray-300 focus:ring-0 focus:border-gray-300  h-10 md:max-w-[500px] max-w-[612px] z-10 bg-background">
        <InputGroupInput
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={search}
        />
      </InputGroup>
      <Button
        variant="purple"
        onClick={handleClick}
        className="md:w-auto h-9.5 rounded-2xl px-6 w-full mt-2 md:mt-0"
      >
        <Search animateOnHover />
        {label}
      </Button>
    </div>
  );
}
