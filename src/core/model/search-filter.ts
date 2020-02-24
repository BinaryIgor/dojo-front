export default class SearchFilter {
    constructor(readonly title: string, readonly tags: string[], readonly locations: string[]) {}

    static empty(): SearchFilter {
        return new SearchFilter("", [], []);
    }
}