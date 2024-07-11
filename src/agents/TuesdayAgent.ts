import { LocalDate, DayOfWeek } from "@js-joda/core";
import { Agent, MovementModifier, Player, Motion } from "../Agent";
import { SnakeState} from "../GameRunner";

// Agent type that 
// always moves up on Tuesdays and always moves down on other days
// using the js-joda library 

class CustomMovementModifier implements MovementModifier {
  modifyMovement(): Motion {
    const today = LocalDate.now();


    if (today.dayOfWeek() === DayOfWeek.TUESDAY) {
      return "up";
    } else {
      return "down";
    }
  }
}

export function init(player:Player, snakeState:SnakeState):Agent{
    const s: number[] = [];
    const agent = new Agent(player, s, snakeState);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
