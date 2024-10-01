import GamesListComponentVue from '@/components/GamesListComponent.vue';

interface UserInterface {
  id: string;
  email: string;
}

interface Game {
  gameFbId?: string;
  Game: string;
  Genre: string;
  Platform: string;
  completionStatus: string;
}

interface MainGame {
  Game: string;
  GameLink: string;
  Year: number;
  Dev: string;
  DevLink: string;
  Publisher: string;
  PublisherLink: string;
  Platform: string;
  PlatformLink: string;
  Genre: string;
}

export type { UserInterface, Game, MainGame };
