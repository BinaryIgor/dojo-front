import TokenRequest from "../model/token-request";
import { ResponsePromise } from "../types"
import Token from "../model/token"
import TokenRepository from './token-repository';
import SmartRequests from '../request/smart-requests';

export default class ApiTokenRepository implements TokenRepository {

    private readonly requests: SmartRequests;
    private readonly signInEndpoint: string

    constructor(requests: SmartRequests, signInEndpoint: string) {
        this.requests = requests;
        this.signInEndpoint = signInEndpoint;
    }

    getOne(request: TokenRequest): ResponsePromise<Token> {
        return this.requests.postJson(this.signInEndpoint, request);
    }
}