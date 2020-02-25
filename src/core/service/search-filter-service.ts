import SearchFilter from '../model/search-filter'
import SearchFilterRepository from "../repository/search-filter-repository";
import SearchFilterRoutes from "../model/search-filter-routes";

export default class SearchFilterService {

    private readonly tasksFilterRepository: SearchFilterRepository
    readonly routes: SearchFilterRoutes

    constructor(tasksFilterRepository: SearchFilterRepository, routes: SearchFilterRoutes) {
        this.tasksFilterRepository = tasksFilterRepository;
        this.routes = routes;
    }

    getFilters(): SearchFilter {
        return this.tasksFilterRepository.getCurrent();
    }
}