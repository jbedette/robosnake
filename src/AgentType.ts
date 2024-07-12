import { Player, Motion } from "./Agent";
import { ScreenPart } from "./GameRunner";

// interface for modifying agent movement
export interface MovementModifier {
  modifyMovement(agent:Agent,screenPart:ScreenPart): Motion;
}

// State array is for recording logic about movement
// snakestate is contained in agent to allow for movment based on game state
export class Agent {
  private player: Player;
  private state: number[];

  constructor(player: Player, state: number[]) {
    this.player = player;
    this.state = state;
  }

  // Default behavior
  movement(agent:Agent,screenPart:ScreenPart): Motion {
    return "up";
  }

  // Overwrite default movement behavior
  setMovement(modifier: MovementModifier):void {
    this.movement = (agent:Agent,screenPart:ScreenPart) => modifier.modifyMovement(agent,screenPart);
  }

  getPlayer(): Player {
    return this.player;
  }
  getState(): number[] {
    return this.state;
  }

  setState(state:number[]): void {
    this.state = state;
  }
}