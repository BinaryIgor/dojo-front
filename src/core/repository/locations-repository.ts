import {ResponsePromise} from "../types";

export default interface LocationsRepository {
    getAll(): ResponsePromise<string[]>
}