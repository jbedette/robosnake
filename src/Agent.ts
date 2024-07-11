import { ScreenPart, SnakeState } from "./GameRunner";

export type Player = "A" | "B" | "C" | "D";

export type Motion = "up" | "down" | "left" | "right";

// interface for modifying agent movement
export interface MovementModifier {
  modifyMovement(agent:Agent,screenPart:ScreenPart): Motion;
}

// State array is for recording logic about movement
// snakestate is contained in agent to allow for movment based on game state
export class Agent {
  private player: Player;
  private state: number[];
  private snakeState: SnakeState;

  constructor(player: Player, state: number[], snakeState:SnakeState) {
    this.player = player;
    this.state = state;
    this.snakeState = snakeState;
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
  getSnakeState(): SnakeState {
    return this.snakeState;
  }

  setState(state:number[]): void {
    this.state = state;
  }
  setSnakeState(snakeState:SnakeState): void {
    this.snakeState = snakeState;
  }
}

// screenPart is a 5x5 window with the agent in the center
export function agentMove(agent:Agent, screenPart: ScreenPart): Motion {
  return agent.movement(agent,screenPart);
}
