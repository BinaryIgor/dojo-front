import SearchFilter from "../model/search-filter";

export default interface SearchFilterRepository {

    getCurrent(): SearchFilter;

    getCurrentTags(): string[];

    updateTags(tags: string[]): void;
}