import fs from "fs";
import path from "path";
import { AppState } from "../models/appState";

export class AppStateController {
  private state: AppState;
  constructor(private filePath: string) {
    this.ensureFile();
    this.state = this.load();
  }

  private ensureFile() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.filePath)) fs.writeFileSync(this.filePath, JSON.stringify({ boards: [] }, null, 2));
  }

  public load(): AppState {
    const raw = fs.readFileSync(this.filePath, "utf-8");
    try {
      const obj = JSON.parse(raw || "{}");
      return AppState.fromJSON(obj);
    } catch {
      return new AppState([]);
    }
  }

  public save(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.state.toJSON(), null, 2));
  }

  getState(): AppState {
    return this.state;
  }
}
