import SearchFilterRepository from "../repository/search-filter-repository";
import TagsService from "./tags-service";

export enum TagsCategory {
    TASKS, DOERS
}

export class TagsServiceProvider {

    private readonly tasksService: TagsService;
    private readonly doersService: TagsService;

    constructor(tasksFilterRepository: SearchFilterRepository, doersFilterRepository: SearchFilterRepository) {
        this.tasksService = new TagsService(tasksFilterRepository);
        this.doersService = new TagsService(doersFilterRepository);
    }

    provide(category: TagsCategory): TagsService {
        return category == TagsCategory.TASKS ? this.tasksService : this.doersService;
    }
}