export type Player = "A" | "B" | "C" | "D";

export type Motion = "up" | "down" | "left" | "right";


import { Agent } from "./AgentType";
import { ScreenPart } from "./GameRunner";

// Here: import the new agent and its init function
// for clarity, pleast follow the pattern of 
//    ` import { init as $UNIQUE_DESCRIPTION } from "./agents/$YOUR_AGENT_FILE_NAME.ts" `

import { init as GoRight } from "./agents/RightAgent";
import { init as Cycle} from "./agents/CycleAgent";
import { init as Stair} from "./agents/StairAgent";
import { init as Tuesday } from "./agents/TuesdayAgent";


// Edit this function to use your imported agent init function and assign to player
export function initializeAgent(player: Player): Agent {
  switch (player) {
    case "A": return GoRight(player);
    case "B": return Tuesday(player)
    case "C": return Cycle(player);
    case "D": return Stair(player);
  }
}

// screenPart is a 5x5 window with the agent in the center
export function agentMove(agent:Agent, screenPart: ScreenPart): Motion {
  return agent.movement(agent,screenPart);
}
