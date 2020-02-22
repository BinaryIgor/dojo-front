import NewUser from "../model/new-user"
import { ResponsePromise, Empty } from "../types";

export default interface UserRepository {

    createNewUser(newUser: NewUser): ResponsePromise<Empty>

    activateUser(token: string): ResponsePromise<Empty>
}