export default class ConfirmationModalMessage {

    readonly title: string
    readonly text: string

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;
    }
}