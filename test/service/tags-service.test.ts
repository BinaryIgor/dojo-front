import Response from "@/core/response/response";
import FakeTagsRepository from "../fake/fake-tags-repository";
import InMemorySearchFilterRepository from "@/core/repository/in-memory-search-filter-repository";
import TagsService from "@/core/service/tags-service";
import SelectableTag from "@/core/model/selectable-tag";
import * as expectations from "../expectation/response-expectations";

const fakeRepository = new FakeTagsRepository();
const searchFilterRepository = new InMemorySearchFilterRepository();
const service = new TagsService(searchFilterRepository, fakeRepository);

describe("TagsService tests", () => {
    it('Returns available tags', async () => {
        searchFilterRepository.updateTags([]);

        const expectedTags = provideUnselectedTags();
        fakeRepository.expectedResponse = Response.successOf(expectedTags.map(e => e.name));

        const response = await service.getTags();

        expectations.expectSuccess(response, expectedTags);
    });

    it('Toggles tags', async () => {
        searchFilterRepository.updateTags([]);

        const expectedTags = provideUnselectedTags();
        const selectedTag = expectedTags[0];
        selectedTag.selected = true;
        
        searchFilterRepository.updateTags([selectedTag.name]);
        fakeRepository.expectedResponse = Response.successOf(expectedTags.map(e => e.name));
        
        const response = await service.getTags();

        expectations.expectSuccess(response, expectedTags);
    });

    it('Get tags propagates errors', async () => {
        const errors = ["TAGS_UNAVAILABLE"];
        fakeRepository.expectedResponse = Response.failure(errors);

        const response = await service.getTags();

        expectations.expectFailure(response, errors);
    });
});

function provideUnselectedTags(): SelectableTag[] {
    return [
        new SelectableTag("TAG_A", false),
        new SelectableTag("TAG_B", false),
        new SelectableTag("TAG_C", false)
    ];
}