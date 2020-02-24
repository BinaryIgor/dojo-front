import Vue from 'vue';
import VueRouter from 'vue-router';

export function getMatchedRouteName(vue: Vue | VueRouter, route: string): string { 
    let vueRouter: VueRouter;
    if (vue instanceof VueRouter) {
        vueRouter = vue;
    } else {
        vueRouter = vue.$router;
    }
    const matched = vueRouter.getMatchedComponents(route);
    return matched.length == 0 ? "" : (matched[0].name ?? "");
}