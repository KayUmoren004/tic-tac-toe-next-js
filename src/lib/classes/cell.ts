import { type CellType } from "../types/game";

class Cell implements CellType {
  value: CellType["value"];
  enabled?: CellType["enabled"];

  constructor() {
    this.value = null;
    this.enabled = true;
  }
}
