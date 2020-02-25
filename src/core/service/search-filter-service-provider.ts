import SearchFilterRepository from "../repository/search-filter-repository";
import { FilterCategory } from "../model/filter-category";
import SearchFilterService from './search-filter-service';

export default class SearchFilterServiceProvider {

    private readonly tasksFilterService: SearchFilterService
    private readonly doersFilterService: SearchFilterService

    constructor(tasksFilterRepository: SearchFilterRepository, doersFilterRepository: SearchFilterRepository) {
        this.tasksFilterService = new SearchFilterService(tasksFilterRepository);
        this.doersFilterService = new SearchFilterService(doersFilterRepository);
    }

    provide(category: FilterCategory): SearchFilterService {
        return category == FilterCategory.TASKS ? this.tasksFilterService : this.doersFilterService;
    }
}