interface UserInterface {
  id: string;
  email: string;
}

interface Game {
  gameId: number;
  title: string;
  genre: string;
  platforms: string;
  completionStatus: string;
}

export type { UserInterface, Game };
