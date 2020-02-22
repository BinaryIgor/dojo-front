import UserRepository from "./user-repository"
import NewUser from "../model/new-user"
import { ResponsePromise, Empty } from "../types";
import SmartRequests from "../request/smart-requests";
import Response from "../response/response";

export default class ApiUserRepository implements UserRepository {

    private readonly requests: SmartRequests
    private readonly signUpEndpoint: string
    private readonly activateAccountEndpoint: string

    constructor(requests: SmartRequests, signUpEndpoint: string, activateAccountEndpoint: string) {
        this.requests = requests;
        this.signUpEndpoint = signUpEndpoint;
        this.activateAccountEndpoint = activateAccountEndpoint;
    }

    createNewUser(newUser: NewUser): ResponsePromise<Empty> {
        return this.requests.postJson(this.signUpEndpoint, newUser)
            .then(r => Response.wrapAsEmpty(r));
    }

    activateUser(token: string): ResponsePromise<Empty> {
        return this.requests.post(`${this.activateAccountEndpoint}/${token}`)
            .then(r => Response.wrapAsEmpty(r));
    }
}