import TokenRequest from "../model/token-request";
import { ResponsePromise } from "../types"
import Token from "../model/token"

export default interface TokenRepository {
    getOne(request: TokenRequest): ResponsePromise<Token>
}