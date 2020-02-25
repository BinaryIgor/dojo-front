import SearchFilterRepository from "../repository/search-filter-repository";
import CitiesRepository from "../repository/cities-repository";
import { ResponsePromise } from "../types";
import Response from "../response/response";
import SelectableLocation from "../model/selectable-location";

//TODO tests!
export default class LocationsService {

    private readonly tasksFilterRepository: SearchFilterRepository
    private readonly citiesRepository: CitiesRepository

    constructor(tasksFilterRepository: SearchFilterRepository, citiesRepository: CitiesRepository) {
        this.tasksFilterRepository = tasksFilterRepository;
        this.citiesRepository = citiesRepository;
    }

    toggleLocation(location: string): void {
        const filterLocations = this.tasksFilterRepository.getCurrent().locations;
        const newLocations = new Array<string>();
        let removed = false;
        for (const c of filterLocations) {
            if (c == location) {
                removed = true;
            } else {
                newLocations.push(c);
            }
        }
        if (!removed) {
            newLocations.push(location);
        }
        this.tasksFilterRepository.updateLocations(newLocations);
    }

    getLocations(): ResponsePromise<SelectableLocation[]> {
        const currentLocations = this.tasksFilterRepository.getCurrent().locations;
        return this.citiesRepository.getAll()
            .then(r => Response.wrap(r, t => this.toSelectableLocations(t, currentLocations)));
    }

    private toSelectableLocations(locations: string[], currentLocations: string[]): SelectableLocation[] {
        const selectableLocations = new Array<SelectableLocation>();
        for (const l of locations) {
            const sl = new SelectableLocation(l, currentLocations.includes(l));
            selectableLocations.push(sl);
        }
        return selectableLocations;
    }
}