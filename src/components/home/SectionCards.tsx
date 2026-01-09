import SearchBarClient from './SearchBarClient';
import GameCard from './GameCard';
import type { RawgGame } from '@/types/rawg';

interface SectionCardsProps {
  games: RawgGame[];
  addButtonLabel: string;
  detaislButtonLabel: string;
  placeholderInput: string;
  labelInput: string;
}

export function SectionCards({
  games,
  addButtonLabel,
  detaislButtonLabel,
  placeholderInput,
  labelInput,
}: SectionCardsProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-6 z-10 py-4 md:py-6">
      <SearchBarClient placeholder={placeholderInput} label={labelInput} />

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {games?.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            addButtonLabel={addButtonLabel}
            detaislButtonLabel={detaislButtonLabel}
          />
        ))}
      </div>
    </div>
  );
}
