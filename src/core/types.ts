import {Response} from "./response/response"

export type ResponsePromise<T> = Promise<Response<T>>;
export type Empty = {};