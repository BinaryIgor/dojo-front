export function showErrorModal(vue, exceptions) {
    //TODO translate exceptions
    showModal(vue, vue.$t('errorTitle'), exceptions);
}

export function showModal(vue, title, text) {
    vue.$parent.$emit('show', {
        title: title,
        text: text
    });
}