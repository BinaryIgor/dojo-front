import SearchFilter from "../model/search-filter";

export default interface SearchFilterRepository {

    getCurrent(): SearchFilter;

    updateTags(tags: string[]): void;
}