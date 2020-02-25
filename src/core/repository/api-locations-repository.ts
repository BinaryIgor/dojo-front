import LocationsRepository from "./locations-repository";
import { ResponsePromise } from "../types";
import SmartRequests from '../request/smart-requests';

export default class ApiLocationsRepository implements LocationsRepository {

    private readonly requests: SmartRequests
    private readonly locationsEndpoint: string

    constructor(requests: SmartRequests, locationsEndpoint: string) {
        this.requests = requests;
        this.locationsEndpoint = locationsEndpoint;
    }

    getAll(): ResponsePromise<string[]> {
        return this.requests.getJson(this.locationsEndpoint);
    }
}