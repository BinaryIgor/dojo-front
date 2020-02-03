export function showErrorModal(vue, exceptions) {
    if (exceptions.length > 0) {
        //TODO translate exceptions
        showModal(vue, vue.$t('errorTitle'), translateExceptions(vue, exceptions));
    }
}

function translateExceptions(vue, exceptions) {
    return exceptions.map(e => {
        let key = `apiErrors.${e}`;
        let translated = vue.$t(key);
        return translated == key ? e : translated;
    });
}

export function showModal(vue, title, text) {
    vue.$parent.$emit('show', {
        title: title,
        texts: [text]
    });
}