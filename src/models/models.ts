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

interface MasterGame {
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

interface GameImportModel {
  Game: string;
  game_title: string;
  game_titleApi1: string;
}

// games.Add({
//   Game: import.Game || import.game_title || import.game_titleAPi1,
//   Field2: import.field2 || import.field_two ||
// })

export type { UserInterface, Game, MasterGame };
