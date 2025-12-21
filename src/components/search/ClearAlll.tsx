import React from 'react';
import { Button } from '../ui/button';
import { BrushCleaning } from 'lucide-react';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

function ClearAlll() {
  const updateSerachParams = useUpdateSearchParams();
  const handleClick = () => {
    updateSerachParams({
      search: null,
      search_exact: null,
      ordering: null,
      platforms: null,
      genres: null,
      parent_platforms: null,
    });
  };

  return (
    <Button
      variant="purple"
      className=" h-9.5 rounded-2xl md:w-auto w-full"
      onClick={handleClick}
    >
      <BrushCleaning className="h-4 w-4 text-orange-500" /> Clear all
    </Button>
  );
}

export default ClearAlll;
