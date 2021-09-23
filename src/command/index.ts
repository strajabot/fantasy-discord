import { RegisterCommand } from "./commands/register"
import { TestCommand } from "./commands/test"

const commandList = [
    new TestCommand(),
    new RegisterCommand()
]
 
export { commandList }