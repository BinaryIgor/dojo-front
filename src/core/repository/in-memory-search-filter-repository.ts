import SearchFilter from "../model/search-filter";
import SearchFilterRepository from "./search-filter-repository";

export default class InMemorySearchFilterRepository implements SearchFilterRepository {

    private filter = SearchFilter.empty();

    getCurrent(): SearchFilter {
        return new SearchFilter(this.filter.title, this.filter.tags.slice(), this.filter.locations.slice());
    }

    updateTags(tags: string[]): void {
        this.filter = new SearchFilter(this.filter.title, tags, this.filter.locations);
    }

    updateLocations(locations: string[]): void {
        this.filter = new SearchFilter(this.filter.title, this.filter.tags, locations);
    }
}
