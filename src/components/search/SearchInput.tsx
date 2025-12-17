import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ui/input-group';
import { Search } from '../animate-ui/icons/search';

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
    <div className="mb-6 mt-4 max-w-lg mx-auto flex flex-col sm:flex-row gap-2 items-center z-10">
      <InputGroup className=" border-gray-300 focus:ring-0 focus:border-gray-300 h-full z-10 bg-background">
        <InputGroupInput
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={search}
        />
      </InputGroup>
      <InputGroupAddon
        align="inline-end"
        className="sm:w-auto w-full h-full z-10"
      >
        <InputGroupButton
          variant="default"
          onClick={handleClick}
          className="w-full h-full"
        >
          <Search animateOnHover className="mr-2 " />
          {label}
        </InputGroupButton>
      </InputGroupAddon>
    </div>
  );
}
