import {expect} from 'chai';
import InMemorySearchFilterRepository from "@/core/repository/in-memory-search-filter-repository";
import SearchFilterService from "@/core/service/search-filter-service";
import SearchFilterRoutes from "@/core/model/search-filter-routes";

const routes = new SearchFilterRoutes("/tags", "/locations");
const filterRepostitory = new InMemorySearchFilterRepository();
const service = new SearchFilterService(filterRepostitory, routes);

describe('SearchFilterService tests', () => {
    it('Returns filters', () => {
        const expectedFilter = filterRepostitory.getCurrent();
        expect(service.getFilters()).to.deep.equal(expectedFilter);
    });

    it('Returns routes', () => {
        expect(service.routes).to.deep.equal(routes);
    });
});