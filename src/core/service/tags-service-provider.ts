import SearchFilterRepository from "../repository/search-filter-repository";
import TagsRepository from "../repository/tags-repository";
import TagsService from "./tags-service";

export enum TagsCategory {
    TASKS, DOERS
}

export class TagsServiceProvider {

    private readonly tasksService: TagsService
    private readonly doersService: TagsService

    constructor(tasksFilterRepository: SearchFilterRepository, doersFilterRepository: SearchFilterRepository,
        tagsRepository: TagsRepository) {
        this.tasksService = new TagsService(tasksFilterRepository, tagsRepository);
        this.doersService = new TagsService(doersFilterRepository, tagsRepository);
    }

    provide(category: TagsCategory): TagsService {
        return category == TagsCategory.TASKS ? this.tasksService : this.doersService;
    }
}