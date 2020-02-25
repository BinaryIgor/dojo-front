import SearchFilterRepository from "../repository/search-filter-repository";
import { FilterCategory } from "../model/filter-category";
import SearchFilterService from './search-filter-service';
import SearchFilterRoutes from "../model/search-filter-routes";

export default class SearchFilterServiceProvider {

    private readonly tasksFilterService: SearchFilterService
    private readonly doersFilterService: SearchFilterService

    constructor(tasksFilterRepository: SearchFilterRepository, tasksFilterRoutes: SearchFilterRoutes,
        doersFilterRepository: SearchFilterRepository, doersFilterRoutes: SearchFilterRoutes) {
        this.tasksFilterService = new SearchFilterService(tasksFilterRepository, tasksFilterRoutes);
        this.doersFilterService = new SearchFilterService(doersFilterRepository, doersFilterRoutes);
    }

    provide(category: FilterCategory): SearchFilterService {
        return category == FilterCategory.TASKS ? this.tasksFilterService : this.doersFilterService;
    }
}