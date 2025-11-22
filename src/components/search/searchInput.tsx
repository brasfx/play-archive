import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ui/input-group';

import { useTranslations } from 'next-intl';

export default function SearchInput({
  handleChange,
  handleKeyPress,
  search,
  handleClick,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  search: string;
  handleClick: () => void;
}) {
  const t = useTranslations('search');

  return (
    <div className="mb-6 mt-4 max-w-lg mx-auto flex flex-col sm:flex-row gap-2 items-center">
      <InputGroup className=" border-gray-300 focus:ring-0 focus:border-gray-300 h-full">
        <InputGroupInput
          placeholder={t('placeholder')}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={search}
        />
      </InputGroup>
      <InputGroupAddon align="inline-end" className="sm:w-auto w-full">
        <InputGroupButton
          variant="default"
          onClick={handleClick}
          className="w-full h-full"
        >
          {t('label')}
        </InputGroupButton>
      </InputGroupAddon>
    </div>
  );
}
