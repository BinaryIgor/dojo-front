import SearchFilter from "../model/search-filter";
import SearchFilterRepository from "./search-filter-repository";

export default class InMemorySearchFilterRepository implements SearchFilterRepository {
    
    //TODO unhardcode!
    private filter = new SearchFilter("", [], ["Warszawa, 20km", "Zdalnie"]);

    getCurrent(): SearchFilter {
        return this.filter;
    }

    updateTags(tags: string[]): void {
        this.filter = new SearchFilter(this.filter.title, tags, this.filter.locations);
    }

    getCurrentTags(): string[] {
        return this.filter.tags.slice();
    }
}
