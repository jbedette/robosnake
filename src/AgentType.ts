import { Player, Agent } from "./Agent";
import { SnakeState } from "./GameRunner";

// Here: import the new agent and its init function
// for clarity, pleast follow the pattern of 
//    ` import { init as $UNIQUE_DESCRIPTION } from "./agents/$YOUR_AGENT_FILE_NAME.ts" `

// import { init as GoRight } from "./agents/RightAgent";
import { init as screenPart } from "./agents/ScreenPartAgent";

import { init as Cycle} from "./agents/CycleAgent";
import { init as Stair} from "./agents/StairAgent";
import { init as Tuesday } from "./agents/TuesdayAgent";


// Edit this function to use your imported agent init function and assign to player
export function initializeAgent(player: Player,s:SnakeState): Agent {
  switch (player) {
    // case "A": return GoRight(player,s);
    case "A": return screenPart(player,s);
    case "B": return Tuesday(player, s)
    case "C": return Cycle(player,s);
    case "D": return Stair(player,s);
  }
}