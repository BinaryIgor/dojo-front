import { ResponsePromise } from "@/core/types";
import Response from "@/core/response/response";
import LocationsRepository from "@/core/repository/locations-repository";
import { resolveResponse } from "./fakes";

export default class FakeLocationsRepository implements LocationsRepository {

    expectedResponse?: Response<string[]>

    getAll(): ResponsePromise<string[]> {
        return resolveResponse(this.expectedResponse);
    }
}