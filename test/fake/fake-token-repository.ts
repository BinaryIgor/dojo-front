import {TokenRequest} from "@/core/model/token-request";
import {ResponsePromise} from "@/core/types";
import {Token} from "@/core/model/token";
import {Response} from "@/core/response/response";
import {TokenRepository} from "@/core/repository/token-repository";
import {resolveResponse} from "./fakes";

export class FakeTokenRepository implements TokenRepository {

    capturedTokenRequest?: TokenRequest
    expectedResponse?: Response<Token>

    getOne(request: TokenRequest): ResponsePromise<Token> {
        this.capturedTokenRequest = request;
        return resolveResponse(this.expectedResponse);
    }
}