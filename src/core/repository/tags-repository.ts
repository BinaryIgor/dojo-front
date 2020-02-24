import {ResponsePromise} from "../types";

export default interface TagsRepository {
    getAll(): ResponsePromise<string[]>
}