import { LocalDate, DayOfWeek } from "@js-joda/core";
import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

/**
 * @fileoverview Agent type that 
 * always moves up on Tuesdays and always moves down on other days
 * using the js-joda library 
 * 
 * @requires jsjoda
 */

class CustomMovementModifier implements MovementModifier {
  /**
   * Define custom movement here 
   * @returns Motion
   */
  modifyMovement(): Motion {
    const today = LocalDate.now();


    if (today.dayOfWeek() === DayOfWeek.TUESDAY) {
      return "up";
    } else {
      return "down";
    }
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
