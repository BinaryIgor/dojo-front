import UserRepository from "../../src/core/repository/user-repository";
import NewUser from "../../src/core/model/new-user"
import { ResponsePromise, Empty } from "../../src/core/types";
import Response from "../../src/core/response/response";
import { resolveResponse } from "./fakes";

export default class FakeUserRepository implements UserRepository {

    capturedNewUser?: NewUser
    expectedResponse?: Response<Empty>
    capturedToken?: string

    createNewUser(newUser: NewUser): ResponsePromise<Empty> {
        this.capturedNewUser = newUser;
        return resolveResponse(this.expectedResponse);
    }

    activateUser(token: string): ResponsePromise<Empty> {
        this.capturedToken = token;
        return resolveResponse(this.expectedResponse);
    }
}