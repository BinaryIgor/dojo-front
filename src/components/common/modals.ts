 

import Vue from "vue";

export const SHOW_MODAL_EVENT = "showModal";
export const SHOW_CONFIRMATION_MODAL_EVENT = 'showConfirmationModal';
export const HIDE_CONFIRMATION_MODAL_EVENT = 'hideConfirmationModal';

export function showErrorModal(vue: Vue, exceptions: string[]): void {
    if (exceptions.length > 0) {
        showModalWithTexts(vue, translate(vue, 'errorTitle'), translateExceptions(vue, exceptions));
    }
}

//TODO check if we can do it better
function translate(vue: Vue, key: string) {
    return vue.$t(key) as string;
}

function translateExceptions(vue: Vue, exceptions: string[]): string[] {
    return exceptions.map(e => {
        const key = `apiErrors.${e}`;
        const translated = translate(vue, key);
        return translated == key ? e : translated;
    });
}

export function showModal(vue: Vue, titleKey: string, textKey?: string): void {
    const title = translate(vue, titleKey);
    const text = textKey  == null ?  "" : translate(vue, textKey); 
    showModalWithTexts(vue, title, [text]);
}

function showModalWithTexts(vue: Vue, title: string, texts: string[]): void {
    vue.$parent.$emit(SHOW_MODAL_EVENT, {
        title: title,
        texts: texts
    });
}

export function showConfirmationModal(vue: Vue, titleKey: string, textKey?: string): void {
    const title = translate(vue, titleKey);
    const text = textKey == null ? "" : translate(vue, textKey);
    vue.$emit(SHOW_CONFIRMATION_MODAL_EVENT, {
        title: title,
        text: text
    });
}

export function registerConfirmationModalListener<T>(vue: Vue, listener: (arg: T) => (void)): void {
    vue.$on(HIDE_CONFIRMATION_MODAL_EVENT, listener);
}