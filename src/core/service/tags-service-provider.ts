import SearchFilterRepository from "../repository/search-filter-repository";
import TagsRepository from "../repository/tags-repository";
import TagsService from "./tags-service";
import { FilterCategory } from "../model/filter-category";

export default class TagsServiceProvider {

    private readonly tasksService: TagsService
    private readonly doersService: TagsService

    constructor(tasksFilterRepository: SearchFilterRepository, doersFilterRepository: SearchFilterRepository,
        tagsRepository: TagsRepository) {
        this.tasksService = new TagsService(tasksFilterRepository, tagsRepository);
        this.doersService = new TagsService(doersFilterRepository, tagsRepository);
    }

    provide(category: FilterCategory): TagsService {
        return category == FilterCategory.TASKS ? this.tasksService : this.doersService;
    }
}