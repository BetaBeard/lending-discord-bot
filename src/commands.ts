import { ICommand } from "./interfaces/command";
import { addLoan } from "./commands/addLoan";
import { getActiveLoans } from "./commands/getActiveLoans";
import { getPaidOffLoans } from "./commands/getPaidOffLoans";

// Centralize commands, everything exported here can be used by the bot
export const Commands: ICommand[] = [addLoan, getActiveLoans, getPaidOffLoans];