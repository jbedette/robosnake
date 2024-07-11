import { Agent, MovementModifier, Player, Motion } from "../Agent";
import { SnakeState } from "../GameRunner";

// Agent type that
// always moves right

class CustomMovementModifier implements MovementModifier {
  modifyMovement(): Motion {
    return "right";
  }
}
export function init(player:Player,snakeState:SnakeState):Agent{
    const s: number[] = [];
    const agent = new Agent(player, s,snakeState);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
