export type Order = {
  name: string;
  value: string;
};

export const orderBy: Order[] = [
  {
    name: 'Data de lançamento (mais recente)',
    value: '-release',
  },
  {
    name: 'Data de lançamento (menos recente)',
    value: 'release',
  },
  {
    name: 'Nome (A-Z)',
    value: '-name',
  },
  {
    name: 'Nome (Z-A)',
    value: 'name',
  },
  {
    name: 'Classificação (mais popular)',
    value: '-rating',
  },
  {
    name: 'Classificação (menos popular)',
    value: 'rating',
  },
  {
    name: 'Nota (maior nota)',
    value: '-metacritic',
  },
  {
    name: 'Nota (menor nota)',
    value: 'metacritic',
  },
  {
    name: 'Data de criação (mais recente)',
    value: '-created',
  },
  {
    name: 'Data de criação (menos recente)',
    value: 'created',
  },
];

export type GenreFilters = {
  id: number;
  name: string;
  slug: string;
  gamesCount: number;
  imageBackground: string;
};

export const genreFilters: GenreFilters[] = [
  {
    id: 4,
    name: 'Action',
    slug: 'action',
    gamesCount: 191339,
    imageBackground:
      'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
  },
  {
    id: 51,
    name: 'Indie',
    slug: 'indie',
    gamesCount: 86133,
    imageBackground:
      'https://media.rawg.io/media/games/48c/48cb04ca483be865e3a83119c94e6097.jpg',
  },
  {
    id: 3,
    name: 'Adventure',
    slug: 'adventure',
    gamesCount: 151527,
    imageBackground:
      'https://media.rawg.io/media/games/879/879c930f9c6787c920153fa2df452eb3.jpg',
  },
  {
    id: 5,
    name: 'RPG',
    slug: 'role-playing-games-rpg',
    gamesCount: 61861,
    imageBackground:
      'https://media.rawg.io/media/games/e6d/e6de699bd788497f4b52e2f41f9698f2.jpg',
  },
  {
    id: 10,
    name: 'Strategy',
    slug: 'strategy',
    gamesCount: 62326,
    imageBackground:
      'https://media.rawg.io/media/games/f95/f95ec06eddda5c5bf206618c49cd3e68.jpg',
  },
  {
    id: 2,
    name: 'Shooter',
    slug: 'shooter',
    gamesCount: 59610,
    imageBackground:
      'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg',
  },
  {
    id: 40,
    name: 'Casual',
    slug: 'casual',
    gamesCount: 67487,
    imageBackground:
      'https://media.rawg.io/media/screenshots/b20/b20a20205954f9765e82298dbd41e48a.jpg',
  },
  {
    id: 14,
    name: 'Simulation',
    slug: 'simulation',
    gamesCount: 76716,
    imageBackground:
      'https://media.rawg.io/media/games/23b/23b69bfef2a1ce2e3dcdf1aa8ef1150b.jpg',
  },
  {
    id: 7,
    name: 'Puzzle',
    slug: 'puzzle',
    gamesCount: 97380,
    imageBackground:
      'https://media.rawg.io/media/games/1fb/1fb1c5f7a71d771f440b27ce7f71e7eb.jpg',
  },
  {
    id: 11,
    name: 'Arcade',
    slug: 'arcade',
    gamesCount: 22679,
    imageBackground:
      'https://media.rawg.io/media/games/23d/23d78acedbb5f40c9fb64e73af5af65d.jpg',
  },
  {
    id: 83,
    name: 'Platformer',
    slug: 'platformer',
    gamesCount: 100913,
    imageBackground:
      'https://media.rawg.io/media/games/718/71891d2484a592d871e91dc826707e1c.jpg',
  },
  {
    id: 59,
    name: 'Massively Multiplayer',
    slug: 'massively-multiplayer',
    gamesCount: 4242,
    imageBackground:
      'https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg',
  },
  {
    id: 1,
    name: 'Racing',
    slug: 'racing',
    gamesCount: 25755,
    imageBackground:
      'https://media.rawg.io/media/games/ff6/ff66ce127716df74175961831ad3a23a.jpg',
  },
  {
    id: 15,
    name: 'Sports',
    slug: 'sports',
    gamesCount: 22605,
    imageBackground:
      'https://media.rawg.io/media/games/be5/be51faf9bec778b4ea1b06e9b084792c.jpg',
  },
  {
    id: 6,
    name: 'Fighting',
    slug: 'fighting',
    gamesCount: 11776,
    imageBackground:
      'https://media.rawg.io/media/games/aac/aac683272f862540a18625f02f5f3679.jpg',
  },
  {
    id: 19,
    name: 'Family',
    slug: 'family',
    gamesCount: 5411,
    imageBackground:
      'https://media.rawg.io/media/screenshots/b1b/b1bde44ad4c3164f81d1249f866ad83c.jpeg',
  },
  {
    id: 28,
    name: 'Board Games',
    slug: 'board-games',
    gamesCount: 8392,
    imageBackground:
      'https://media.rawg.io/media/games/11b/11b81edff7f45024e36b88e880d86585.jpg',
  },
  {
    id: 17,
    name: 'Card',
    slug: 'card',
    gamesCount: 4544,
    imageBackground:
      'https://media.rawg.io/media/games/1db/1dbc3d0c9de2709e21326cdcb91468ae.jpg',
  },
  {
    id: 34,
    name: 'Educational',
    slug: 'educational',
    gamesCount: 15719,
    imageBackground:
      'https://media.rawg.io/media/games/60a/60a0b8f88184f25621b498c2ee1ebb05.jpg',
  },
];

export type PlatformFilters = {
  id: number;
  name: string;
  slug: string;
  gamesCount: number;
  imageBackground: string;
};

export const platforms: PlatformFilters[] = [
  {
    id: 4,
    name: 'PC',
    slug: 'pc',
    gamesCount: 560119,
    imageBackground:
      'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
  },
  {
    id: 187,
    name: 'PlayStation 5',
    slug: 'playstation5',
    gamesCount: 1395,
    imageBackground:
      'https://media.rawg.io/media/games/e11/e11325e2f89151d31f612e38dee3b6a0.jpg',
  },
  {
    id: 1,
    name: 'Xbox One',
    slug: 'xbox-one',
    gamesCount: 5724,
    imageBackground:
      'https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg',
  },
  {
    id: 18,
    name: 'PlayStation 4',
    slug: 'playstation4',
    gamesCount: 6967,
    imageBackground:
      'https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg',
  },
  {
    id: 186,
    name: 'Xbox Series S/X',
    slug: 'xbox-series-x',
    gamesCount: 1202,
    imageBackground:
      'https://media.rawg.io/media/games/e44/e445335e611b4ccf03af71fffcbd30a4.jpg',
  },
  {
    id: 7,
    name: 'Nintendo Switch',
    slug: 'nintendo-switch',
    gamesCount: 5742,
    imageBackground:
      'https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg',
  },
  {
    id: 3,
    name: 'iOS',
    slug: 'ios',
    gamesCount: 77428,
    imageBackground:
      'https://media.rawg.io/media/games/daa/daaee07fcb40744d90cf8142f94a241f.jpg',
  },
  {
    id: 21,
    name: 'Android',
    slug: 'android',
    gamesCount: 52498,
    imageBackground:
      'https://media.rawg.io/media/games/6d3/6d33014a4ed48a19c30a77ead5a0f62e.jpg',
  },
  {
    id: 8,
    name: 'Nintendo 3DS',
    slug: 'nintendo-3ds',
    gamesCount: 1682,
    imageBackground:
      'https://media.rawg.io/media/games/041/041026016869e440fb1fb2b6be5222c4.jpg',
  },
  {
    id: 9,
    name: 'Nintendo DS',
    slug: 'nintendo-ds',
    gamesCount: 2485,
    imageBackground:
      'https://media.rawg.io/media/games/a3f/a3fb21a739b6abf7ceee3dead89a73d7.jpg',
  },
  {
    id: 13,
    name: 'Nintendo DSi',
    slug: 'nintendo-dsi',
    gamesCount: 37,
    imageBackground:
      'https://media.rawg.io/media/screenshots/078/078629e997421ca28e9098bd7a87cb10.jpg',
  },
  {
    id: 5,
    name: 'macOS',
    slug: 'macos',
    gamesCount: 107964,
    imageBackground:
      'https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg',
  },
  {
    id: 6,
    name: 'Linux',
    slug: 'linux',
    gamesCount: 80327,
    imageBackground:
      'https://media.rawg.io/media/games/16b/16b1b7b36e2042d1128d5a3e852b3b2f.jpg',
  },
  {
    id: 14,
    name: 'Xbox 360',
    slug: 'xbox360',
    gamesCount: 2807,
    imageBackground:
      'https://media.rawg.io/media/games/c80/c80bcf321da44d69b18a06c04d942662.jpg',
  },
  {
    id: 80,
    name: 'Xbox',
    slug: 'xbox-old',
    gamesCount: 744,
    imageBackground:
      'https://media.rawg.io/media/games/233/233cdc08cce0228f6f35222eca3bff92.jpg',
  },
  {
    id: 16,
    name: 'PlayStation 3',
    slug: 'playstation3',
    gamesCount: 3164,
    imageBackground:
      'https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg',
  },
  {
    id: 15,
    name: 'PlayStation 2',
    slug: 'playstation2',
    gamesCount: 2070,
    imageBackground:
      'https://media.rawg.io/media/games/2ee/2eef5ed5e82c28d1299ecc2a0e60f2cb.jpg',
  },
  {
    id: 27,
    name: 'PlayStation',
    slug: 'playstation1',
    gamesCount: 1682,
    imageBackground:
      'https://media.rawg.io/media/games/243/2434639122ce19d4811048cd11ab5ba0.jpg',
  },
  {
    id: 19,
    name: 'PS Vita',
    slug: 'ps-vita',
    gamesCount: 1458,
    imageBackground:
      'https://media.rawg.io/media/games/e4f/e4fb3fd188f61fabec48dca22e6ef28a.jpg',
  },
  {
    id: 17,
    name: 'PSP',
    slug: 'psp',
    gamesCount: 1377,
    imageBackground:
      'https://media.rawg.io/media/games/9d4/9d45e22df640fcb6f4b754aa3491ae09.jpg',
  },
  {
    id: 10,
    name: 'Wii U',
    slug: 'wii-u',
    gamesCount: 1114,
    imageBackground:
      'https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg',
  },
  {
    id: 11,
    name: 'Wii',
    slug: 'wii',
    gamesCount: 2208,
    imageBackground:
      'https://media.rawg.io/media/games/693/693952316d4b90984a92e7ab0f5c9b81.jpg',
  },
  {
    id: 105,
    name: 'GameCube',
    slug: 'gamecube',
    gamesCount: 636,
    imageBackground:
      'https://media.rawg.io/media/games/83b/83b59a9d512bec8bc8bda6b539b215b2.jpg',
  },
  {
    id: 83,
    name: 'Nintendo 64',
    slug: 'nintendo-64',
    gamesCount: 363,
    imageBackground:
      'https://media.rawg.io/media/screenshots/61f/61f183e3d12c7846ed6bd3c027a9fa47.jpg',
  },
  {
    id: 24,
    name: 'Game Boy Advance',
    slug: 'game-boy-advance',
    gamesCount: 956,
    imageBackground:
      'https://media.rawg.io/media/games/373/373a9a1f664de6e4c31f08644729e2db.jpg',
  },
  {
    id: 43,
    name: 'Game Boy Color',
    slug: 'game-boy-color',
    gamesCount: 428,
    imageBackground:
      'https://media.rawg.io/media/games/360/360f00cbb4b4364b9af0e7ff8e397b65.jpg',
  },
  {
    id: 26,
    name: 'Game Boy',
    slug: 'game-boy',
    gamesCount: 617,
    imageBackground:
      'https://media.rawg.io/media/games/057/0573c1c9e1f2414c1f4acabe86ee9fd9.jpg',
  },
  {
    id: 79,
    name: 'SNES',
    slug: 'snes',
    gamesCount: 989,
    imageBackground:
      'https://media.rawg.io/media/games/087/08727beb32c364d30e8b2a1aa8595f8e.jpg',
  },
  {
    id: 49,
    name: 'NES',
    slug: 'nes',
    gamesCount: 1024,
    imageBackground:
      'https://media.rawg.io/media/games/f78/f7809ab885f7464845681e5931aabeb8.jpg',
  },
  {
    id: 55,
    name: 'Classic Macintosh',
    slug: 'macintosh',
    gamesCount: 674,
    imageBackground:
      'https://media.rawg.io/media/games/38a/38af969459ad6e5de116ec8a4a84218c.jpg',
  },
  {
    id: 41,
    name: 'Apple II',
    slug: 'apple-ii',
    gamesCount: 424,
    imageBackground:
      'https://media.rawg.io/media/games/941/94139518bc51a86b9e1b762e0b8b62c8.jpg',
  },
  {
    id: 166,
    name: 'Commodore / Amiga',
    slug: 'commodore-amiga',
    gamesCount: 2084,
    imageBackground:
      'https://media.rawg.io/media/screenshots/101/1015fe740ce5654eb97c9140f6da3c3e.jpg',
  },
  {
    id: 28,
    name: 'Atari 7800',
    slug: 'atari-7800',
    gamesCount: 64,
    imageBackground:
      'https://media.rawg.io/media/screenshots/565/56504b28b184dbc630a7de118e39d822.jpg',
  },
  {
    id: 31,
    name: 'Atari 5200',
    slug: 'atari-5200',
    gamesCount: 64,
    imageBackground:
      'https://media.rawg.io/media/screenshots/678/6786598cba3939d48ed60cbd1a3723f4.jpg',
  },
  {
    id: 23,
    name: 'Atari 2600',
    slug: 'atari-2600',
    gamesCount: 294,
    imageBackground:
      'https://media.rawg.io/media/screenshots/ff6/ff623993a854663931c1e78d72a16a5a.jpg',
  },
  {
    id: 22,
    name: 'Atari Flashback',
    slug: 'atari-flashback',
    gamesCount: 30,
    imageBackground:
      'https://media.rawg.io/media/screenshots/2aa/2aa07f58491e14b0183333f8956bc802.jpg',
  },
  {
    id: 25,
    name: 'Atari 8-bit',
    slug: 'atari-8-bit',
    gamesCount: 309,
    imageBackground:
      'https://media.rawg.io/media/games/876/8764efc52fba503a00af64a2cd51f66c.jpg',
  },
  {
    id: 34,
    name: 'Atari ST',
    slug: 'atari-st',
    gamesCount: 836,
    imageBackground:
      'https://media.rawg.io/media/games/e6a/e6a509fed4879271d7d7eaba04349d10.jpg',
  },
  {
    id: 46,
    name: 'Atari Lynx',
    slug: 'atari-lynx',
    gamesCount: 57,
    imageBackground:
      'https://media.rawg.io/media/screenshots/d71/d71b68d3f6b1810bc9d64d7aea746d30.jpg',
  },
  {
    id: 50,
    name: 'Atari XEGS',
    slug: 'atari-xegs',
    gamesCount: 22,
    imageBackground:
      'https://media.rawg.io/media/screenshots/769/7691726d70c23c029903df08858df001.jpg',
  },
  {
    id: 167,
    name: 'Genesis',
    slug: 'genesis',
    gamesCount: 850,
    imageBackground:
      'https://media.rawg.io/media/screenshots/f7a/f7a70f1b271de9b92a9714db33e4c8ba.jpg',
  },
  {
    id: 107,
    name: 'SEGA Saturn',
    slug: 'sega-saturn',
    gamesCount: 375,
    imageBackground:
      'https://media.rawg.io/media/games/7ca/7ca0df41799243443a4e3887720fdf2a.jpg',
  },
  {
    id: 119,
    name: 'SEGA CD',
    slug: 'sega-cd',
    gamesCount: 163,
    imageBackground:
      'https://media.rawg.io/media/screenshots/9a0/9a01b32ce1a3e0576018a2580e32cf26.jpg',
  },
  {
    id: 117,
    name: 'SEGA 32X',
    slug: 'sega-32x',
    gamesCount: 46,
    imageBackground:
      'https://media.rawg.io/media/screenshots/d9f/d9f308b5d824ae8f047edc0a998a587b.jpg',
  },
  {
    id: 74,
    name: 'SEGA Master System',
    slug: 'sega-master-system',
    gamesCount: 239,
    imageBackground:
      'https://media.rawg.io/media/screenshots/347/347e1979dcf9b62dc48202b73317a186.jpg',
  },
  {
    id: 106,
    name: 'Dreamcast',
    slug: 'dreamcast',
    gamesCount: 364,
    imageBackground:
      'https://media.rawg.io/media/games/838/838b3e1f39cb8e60c9287cc88607bf52.jpg',
  },
  {
    id: 111,
    name: '3DO',
    slug: '3do',
    gamesCount: 101,
    imageBackground:
      'https://media.rawg.io/media/games/47b/47b50d880be8453bf9cda6e5c007bc26.jpg',
  },
  {
    id: 112,
    name: 'Jaguar',
    slug: 'jaguar',
    gamesCount: 40,
    imageBackground:
      'https://media.rawg.io/media/games/8fc/8fcc2ff5c7bcdb58199b1a4326817ceb.jpg',
  },
  {
    id: 77,
    name: 'Game Gear',
    slug: 'game-gear',
    gamesCount: 229,
    imageBackground:
      'https://media.rawg.io/media/games/687/687c7ac926491e65dcb8f0c9d45cab07.jpg',
  },
  {
    id: 12,
    name: 'Neo Geo',
    slug: 'neogeo',
    gamesCount: 125,
    imageBackground:
      'https://media.rawg.io/media/screenshots/4cc/4ccee6c3e367f4dd94d19d4857dfc1c9.jpeg',
  },
];
