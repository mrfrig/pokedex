import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim();
  if (trimmed.length > 0) {
    return trimmed
      .split(/\s+/)
      .map((word) => word.toLowerCase());
  }
  return [];
}

export function startREPL(state: State) {
  const replInterface = state.rl;
  replInterface.prompt();
  replInterface.on("line", (line) => { 
    const commands = cleanInput(line);
    if (commands.length > 0) {
      const command = commands[0];
      const availableCommands = state.commands;
      if (command in availableCommands) {
        availableCommands[command].callback(state);
      } else {
        console.log(`Unknown command`);
      }
    }
    
    replInterface.prompt();
  });
}