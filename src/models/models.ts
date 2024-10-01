interface UserInterface {
  id: string;
  email: string;
}

interface Game {
  gameFbId?: string;
  id: string;
  name: string;
  background_image: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  completionStatus?: string;
}

export type { UserInterface, Game };
