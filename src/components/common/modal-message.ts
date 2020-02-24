export default class ModalMessage {

    readonly title: string
    readonly texts: string[]

    constructor(title: string, texts: string[]) {
        this.title = title;
        this.texts = texts;
    }
}