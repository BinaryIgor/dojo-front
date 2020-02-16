export function showErrorModal(vue, exceptions) {
    if (exceptions.length > 0) {
        _showModal(vue, vue.$t('errorTitle'), translateExceptions(vue, exceptions));
    }
}

function translateExceptions(vue, exceptions) {
    return exceptions.map(e => {
        let key = `apiErrors.${e}`;
        let translated = vue.$t(key);
        return translated == key ? e : translated;
    });
}

export function showModal(vue, titleKey, textKey="") {
    let title = vue.$t(titleKey);
    let text = textKey == "" ? "" :vue.$(textKey); 
    _showModal(vue, title, [text]);
}

function _showModal(vue, title, texts) {
    vue.$parent.$emit('show', {
        title: title,
        texts: texts
    });
}