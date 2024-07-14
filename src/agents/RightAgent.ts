import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

/**
 *  Agent that always goes right
 */
export class CustomMovementModifier implements MovementModifier {
  /**
   * 
   * @returns 
   */
  modifyMovement(): Motion {
    return "right";
  }
}

/**
 * @param player 
 * @returns 
 */
export function init(player:Player):Agent{
  const s: number[] = [];
  const agent = new Agent(player, s);
  const customModifier = new CustomMovementModifier();

  agent.setMovement(customModifier);
  return agent;
}
