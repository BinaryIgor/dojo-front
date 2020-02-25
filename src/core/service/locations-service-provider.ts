import SearchFilterRepository from "../repository/search-filter-repository";
import LocationsRepository from "../repository/locations-repository";
import LocationsService from "./locations-service";
import { FilterCategory } from "../model/filter-category";

export default class LocationsServiceProvider {

    private readonly tasksService: LocationsService
    private readonly doersService: LocationsService

    constructor(tasksFilterRepository: SearchFilterRepository, doersFilterRepository: SearchFilterRepository,
        locationsRepository: LocationsRepository) {
        this.tasksService = new LocationsService(tasksFilterRepository, locationsRepository);
        this.doersService = new LocationsService(doersFilterRepository, locationsRepository);
    }

    provide(category: FilterCategory): LocationsService {
        return category == FilterCategory.TASKS ? this.tasksService : this.doersService;
    }
}