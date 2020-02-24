import SearchFilterRepository from "../repository/search-filter-repository";
import { ResponsePromise } from "../types";
import Response from "../response/response";
import SelectableTag from "../../core/model/selectable-tag";

export default class TagsService {

    private readonly tasksFilterRepository: SearchFilterRepository

    constructor(tasksFilterRepository: SearchFilterRepository) {
        this.tasksFilterRepository = tasksFilterRepository;
    }

    toggleTag(tag: string): void {
        const filtersTags = this.tasksFilterRepository.getCurrentTags();
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
        const currentTags = this.tasksFilterRepository.getCurrentTags();
        return Promise.resolve(Response.successOf([
            "Remont", "Rozrywka", "Matematyka", "Wyzwanie"
        ])).then(r => Response.wrap(r, t => this.toSelectableTags(t, currentTags)));
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