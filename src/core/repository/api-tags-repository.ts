import TagsRepository from "./tags-repository";
import {ResponsePromise} from "../types";
import SmartRequests from '../request/smart-requests';

export default class ApiTagsRepository implements TagsRepository {

    private readonly requests: SmartRequests
    private readonly tagsEndpoint: string

    constructor(requests: SmartRequests, tagsEndpoint: string) {
        this.requests = requests;
        this.tagsEndpoint = tagsEndpoint;
    }

    getAll(): ResponsePromise<string[]> {
        return this.requests.getJson(this.tagsEndpoint);
    }
}