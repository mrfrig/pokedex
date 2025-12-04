import readline from "readline";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim();
  if (trimmed.length > 0) {
    return trimmed
      .split(/\s+/)
      .map((word) => word.toLowerCase());
  }
  return [];
}

export function startREPL() {
  const replInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  replInterface.prompt();
  replInterface.on("line", (line) => { 
    const commands = cleanInput(line);
    if (commands.length > 0) {
      const command = commands[0];
      console.log(`Your command was: ${command}`);
    }
    
    replInterface.prompt();
  });
}