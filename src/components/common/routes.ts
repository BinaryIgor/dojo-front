import Vue from 'vue';

export function getMatchedRouteName(vue: Vue, route: string): string { 
    const matched = vue.$router.getMatchedComponents(route);
    return matched.length == 0 ? "" : (matched[0].name ?? "");
}