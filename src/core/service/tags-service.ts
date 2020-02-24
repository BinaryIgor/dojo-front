import SearchFilterRepository from "../repository/search-filter-repository";
import TagsRepository from "../repository/tags-repository";
import { ResponsePromise } from "../types";
import Response from "../response/response";
import SelectableTag from "../../core/model/selectable-tag";

export default class TagsService {

    private readonly tasksFilterRepository: SearchFilterRepository
    private readonly tagsRepository: TagsRepository

    constructor(tasksFilterRepository: SearchFilterRepository, tagsRepository: TagsRepository) {
        this.tasksFilterRepository = tasksFilterRepository;
        this.tagsRepository = tagsRepository;
    }

    toggleTag(tag: string): void {
        const filtersTags = this.tasksFilterRepository.getCurrent().tags;
        const newTags = new Array<string>();
        let removed = false;
        for (const t of filtersTags) {
            if (t == tag) {
                removed = true;
            } else {
                newTags.push(t);
            }
        }
        if (!removed) {
            newTags.push(tag);
        }
        this.tasksFilterRepository.updateTags(newTags);
    }

    getTags(): ResponsePromise<SelectableTag[]> {
        const currentTags = this.tasksFilterRepository.getCurrent().tags;
        return this.tagsRepository.getAll()
            .then(r => Response.wrap(r, t => this.toSelectableTags(t, currentTags)));
    }

    private toSelectableTags(tags: string[], currentTags: string[]): SelectableTag[] {
        const selectableTags = new Array<SelectableTag>();
        for (const t of tags) {
            const st = new SelectableTag(t, currentTags.includes(t));
            selectableTags.push(st);
        }
        return selectableTags;
    }
}