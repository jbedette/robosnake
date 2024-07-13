import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

/** 
 * @fileoverview Agent type that
 * always moves right
 * 
 * @link ../AgentType.ts
*/


class CustomMovementModifier implements MovementModifier {
  /**
   * Define custom movement here 
   * @returns Motion
   */
  modifyMovement(): Motion {
    return "right";
  }
}

/**
 * @param player 
 * @returns Agent with custom movement
 */
export function init(player:Player):Agent{
    const s: number[] = [];
    const agent = new Agent(player, s);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
