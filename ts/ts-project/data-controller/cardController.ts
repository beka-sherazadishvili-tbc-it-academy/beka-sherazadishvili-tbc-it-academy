import { Card } from "../models/card";
import { CommonController } from "./commonController";

class CardController extends CommonController<Card> {
    constructor(jsonPath: string) {
        super(jsonPath)
    }
  protected fromJSON(obj: any): Card {
    return Card.fromJSON(obj);
  }

  protected toJSON(card: Card) {
    return card.toJSON();
  }
}
