import {expect} from "chai";
import InMemorySearchFilterRepository from "@/core/repository/in-memory-search-filter-repository";
import SearchFilter from "@/core/model/search-filter";

describe('InMemorySearchFilterRepository tests', () => {
    
    let repository: InMemorySearchFilterRepository

    beforeEach(() => {
        repository = new InMemorySearchFilterRepository();
    });
    
    it('Returns empty filter', () => {
        expect(repository.getCurrent()).to.deep.equal(SearchFilter.empty());
    })

    it('Updates tags', () => {
        const tags = ['A', "B"];
        repository.updateTags(tags);
        expect(repository.getCurrent().tags).to.deep.equal(tags);
    });

    it('Returns copy of filter', () => {
        const filter = repository.getCurrent();
        filter.locations.push("A");
        filter.tags.push("B");
        expect(repository.getCurrent()).to.deep.equal(SearchFilter.empty());
    });
});