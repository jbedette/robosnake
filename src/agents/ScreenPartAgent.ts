import { ScreenPart } from "../GameRunner";
import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

// Agent type that
// always moves right

class CustomMovementModifier implements MovementModifier {
  modifyMovement(agent:Agent,screenPart:ScreenPart): Motion {
    console.log(screenPart)
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
