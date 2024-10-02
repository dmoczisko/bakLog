interface UserInterface {
  id: string;
  email: string;
}

interface Genres {
  name: string;
}

interface Platforms {
  platform: {
    name: string;
  };
}

interface Game {
  background_image: string;
  completionStatus?: string;
  gameFbId?: string;
  id: string;
  name: string;
  genres: Genres[];
  platforms: Platforms[];
}

export type { UserInterface, Genres, Platforms, Game };
