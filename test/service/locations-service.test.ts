import Response from "@/core/response/response";
import FakeLocationsRepository from "../fake/fake-locations-repository";
import InMemorySearchFilterRepository from "@/core/repository/in-memory-search-filter-repository";
import LocationsService from "@/core/service/locations-service";
import SelectableLocation from "@/core/model/selectable-location";
import * as expectations from "../expectation/response-expectations";

const fakeRepository = new FakeLocationsRepository();
const searchFilterRepository = new InMemorySearchFilterRepository();
const service = new LocationsService(searchFilterRepository, fakeRepository);

describe("LocationsService tests", () => {
    it('Returns available locations', async () => {
        searchFilterRepository.updateLocations([]);

        const expectedLocations = provideUnselectedLocations();
        fakeRepository.expectedResponse = Response.successOf(expectedLocations.map(e => e.name));

        const response = await service.getLocations();

        expectations.expectSuccess(response, expectedLocations);
    });

    it('Toggles locations', async () => {
        searchFilterRepository.updateLocations([]);

        const expectedLocations = provideUnselectedLocations();
        const selectedLocation = expectedLocations[0];
        selectedLocation.selected = true;
        
        searchFilterRepository.updateLocations([selectedLocation.name]);
        fakeRepository.expectedResponse = Response.successOf(expectedLocations.map(e => e.name));
        
        const response = await service.getLocations();

        expectations.expectSuccess(response, expectedLocations);
    });

    it('Get locations propagates errors', async () => {
        const errors = ["LOCATIONS_UNAVAILABLE"];
        fakeRepository.expectedResponse = Response.failure(errors);

        const response = await service.getLocations();

        expectations.expectFailure(response, errors);
    });
});

function provideUnselectedLocations(): SelectableLocation[] {
    return [
        new SelectableLocation("Remote", false),
        new SelectableLocation("Poznań", false),
        new SelectableLocation("Łódź", false)
    ];
}