import { Command } from "./commands/commandInterface";
import { addLoan } from "./commands/addLoan";
import { getActiveLoans } from "./commands/getActiveLoans";
import { getPaidOffLoans } from "./commands/getPaidOffLoans";

// Centralize commands, everything exported here can be used by the bot
export const Commands: Command[] = [addLoan, getActiveLoans, getPaidOffLoans];