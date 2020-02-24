import { ResponsePromise } from "@/core/types";
import Response from "@/core/response/response";
import TagsRepository from "@/core/repository/tags-repository";
import { resolveResponse } from "./fakes";

export default class FakeTagsRepository implements TagsRepository {

    expectedResponse?: Response<string[]>

    getAll(): ResponsePromise<string[]> {
        return resolveResponse(this.expectedResponse);
    }
}