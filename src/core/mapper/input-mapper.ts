import { NewUser } from "../model/new-user";
import { NewUserInput } from "../model/input/new-user-input";

export function toNewUser(input: NewUserInput): NewUser {
    return new NewUser(input.name, input.email, input.password);
}