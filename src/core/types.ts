import Response from "./response/response"
import InputResponse from "./response/input-response";
import InputErrors from "./error/input-errors";

export type ResponsePromise<T> = Promise<Response<T>>;
export type InputResponsePromise<V, IE extends InputErrors> = Promise<InputResponse<V, IE>>
export type Empty = {};