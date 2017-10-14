export default class ModelDialogService {
    constructor() {
        this.showHandler = () => {};
    }

    static getSingletonInstance() {
        if (!ModelDialogService.instance)
            ModelDialogService.instance = new ModelDialogService();

        return ModelDialogService.instance;
    }

    subscribeOnShow(showHandler) {
        this.showHandler = showHandler;
    }

    ask(question, okHandler) {
        this.showHandler(question, okHandler);
    }
}