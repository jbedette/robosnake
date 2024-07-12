import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

// Agent type that
// always moves right

class CustomMovementModifier implements MovementModifier {
  modifyMovement(): Motion {
    return "right";
  }
}
export function init(player:Player):Agent{
    const s: number[] = [];
    const agent = new Agent(player, s);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
