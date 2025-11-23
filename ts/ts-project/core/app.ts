import path from "path";
import { CardController } from "../data-controller/cardController";
import { CardService } from "../services/cardService";
import { BoardController } from "../data-controller/boardController";
import { ListController } from "../data-controller/listController";
import { AppStateController } from "../data-controller/appStateController";
import { BoardService } from "../services/boardService";
import { ListService } from "../services/listService";

export class App {
  controllers: any = {};
  services: any = {};

  constructor() {
    const base = path.join(__dirname, "..", "data");
    const statePath: string = path.join(base, "app-state.json");
    
    console.log("Data file path:", statePath);
    this.controllers.state = new AppStateController(statePath);
    this.controllers.boards = new BoardController(this.controllers.state);
    this.controllers.lists = new ListController(this.controllers.state);
    this.controllers.cards = new CardController(this.controllers.state);

    this.services.boards = new BoardService(
      this.controllers.cards,
      this.controllers.boards,
      this.controllers.lists
    );
   
    this.services.lists = new ListService(
      this.controllers.cards,
      this.controllers.boards,
      this.controllers.lists
    );

    this.services.cards = new CardService(
      this.controllers.cards,
      this.controllers.boards,
      this.controllers.lists
    );
  }
}
