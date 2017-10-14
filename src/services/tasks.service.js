    import TaskModel from '../models/task.model';

export default class TasksService {
    static getSingletonInstance() {
        if (!TasksService.instance)
            TasksService.instance = new TasksService();

        return TasksService.instance;
    }

    constructor() {
        TasksService.nextId = 0;
        this.store = {};
        this.storeUpdateHandlers = [];
    }

    subscribe(handler) {
        this.storeUpdateHandlers.push(handler);
        setTimeout(() => handler(), 0);
    }

    emit() {
        for (let handler of this.storeUpdateHandlers) handler();
    }

    create(rawTask) {
        rawTask.id = ++TasksService.nextId;
        let task = new TaskModel(rawTask);
        if (!this.store[task.address]) this.store[task.address] = [];
        this.store[task.address].push(task);
        this.emit();
    }

    update(rawTask) {
        let task = new TaskModel(rawTask);
        if (!this.store[task.address]) throw new Error('Cannot find task');

        let taskIndex = this.store[task.address].findIndex(t => t.id === task.id);
        if (taskIndex < 0) throw new Error('Cannot find task');

        this.store[task.address].splice(taskIndex, 1, task);
        this.emit();
    }

    delete(task) {
        if (this.store[task.address]) {
            let taskIndex = this.store[task.address]
                .findIndex(t => t.id === task.id);
            if (taskIndex >= 0) {
                this.store[task.address].splice(taskIndex, 1);
                this.emit();
            }
        }
    }
}