import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import GameCard from '../GameCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, fill, fetchPriority, src, alt, ...props }) => {
    const React = require('react');

    const resolvedSrc = typeof src === 'string' ? src : src?.src ?? '';

    return React.createElement('img', {
      src: resolvedSrc,
      alt,

      ...(priority ? { 'data-priority': 'true' } : {}),
      ...props,
    });
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/utils/formatDate', () => ({
  FormatYear: jest.fn(() => '2020'),
}));

jest.mock('../AddToLibraryButtonClient.tsx', () => ({
  __esModule: true,
  default: ({ label }: any) => <button type="button">{label}</button>,
}));

jest.mock('@/components/ui/shine-border', () => ({
  __esModule: true,
  ShineBorder: () => <div data-testid="shine-border" />,
}));

jest.mock('@/components/animate-ui/icons/disc-3', () => ({
  __esModule: true,
  Disc3: () => <span aria-label="disc-icon" />,
}));

jest.mock('@/components/animate-ui/icons/star', () => ({
  __esModule: true,
  Star: () => <span aria-label="star-icon" />,
}));

describe('GameCard', () => {
  const baseGame: any = {
    id: 123,
    name: 'Hades',
    slug: 'hades',
    background_image: 'https://example.com/hades.jpg',
    released: '2020-09-17',
    genres: [{ name: 'Action' }, { name: 'RPG' }, { name: 'Indie' }],
    parent_platforms: [
      { platform: { name: 'PC' } },
      { platform: { name: 'PlayStation' } },
      { platform: { name: 'Xbox' } },
      { platform: { name: 'Nintendo Switch' } },
    ],
  };

  it('renderiza nome do jogo e labels dos botões', () => {
    render(
      <GameCard
        game={baseGame}
        index={0}
        addButtonLabel="Adicionar"
        detaislButtonLabel="Detalhes"
      />,
    );

    expect(screen.getByText('Hades')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Detalhes' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Adicionar' }),
    ).toBeInTheDocument();
  });

  it('renderiza no máximo 2 gêneros', () => {
    render(
      <GameCard
        game={baseGame}
        index={0}
        addButtonLabel="Adicionar"
        detaislButtonLabel="Detalhes"
      />,
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('RPG')).toBeInTheDocument();
    expect(screen.queryByText('Indie')).not.toBeInTheDocument();
  });

  it('renderiza ano (released) usando FormatYear quando existir released', () => {
    render(
      <GameCard
        game={baseGame}
        index={0}
        addButtonLabel="Adicionar"
        detaislButtonLabel="Detalhes"
      />,
    );

    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('renderiza no máximo 3 plataformas, separadas por vírgula', () => {
    render(
      <GameCard
        game={baseGame}
        index={0}
        addButtonLabel="Adicionar"
        detaislButtonLabel="Detalhes"
      />,
    );

    expect(screen.getByText('PC, PlayStation, Xbox')).toBeInTheDocument();
    expect(screen.queryByText(/Nintendo Switch/i)).not.toBeInTheDocument();
  });

  it('cria link para /game/:id no botão de detalhes', () => {
    render(
      <GameCard
        game={baseGame}
        index={0}
        addButtonLabel="Adicionar"
        detaislButtonLabel="Detalhes"
      />,
    );

    const detailsButton = screen.getByRole('button', { name: 'Detalhes' });
    const anchor = detailsButton.closest('a');
    expect(anchor).toHaveAttribute('href', '/game/123');
  });

  it('define priority=true apenas para index < 13 (imagem)', () => {
    const { rerender } = render(
      <GameCard
        game={baseGame}
        index={0}
        addButtonLabel="Adicionar"
        detaislButtonLabel="Detalhes"
      />,
    );

    expect(screen.getByRole('img')).toHaveAttribute('data-priority', 'true');

    rerender(
      <GameCard
        game={baseGame}
        index={13}
        addButtonLabel="Adicionar"
        detaislButtonLabel="Detalhes"
      />,
    );

    expect(screen.getByRole('img')).not.toHaveAttribute('data-priority');
  });
});
