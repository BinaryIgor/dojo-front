import SearchFilter from '../model/search-filter'
import SearchFilterRepository from "../repository/search-filter-repository";

export default class TasksService {

    private readonly tasksFilterRepository: SearchFilterRepository

    constructor(tasksFilterRepository: SearchFilterRepository) {
        this.tasksFilterRepository = tasksFilterRepository;
    }

    getFilters(): SearchFilter {
        return this.tasksFilterRepository.getCurrent();
    }
}