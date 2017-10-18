    import TaskModel from '../models/task.model';

export default class TasksService {
    static getSingletonInstance() {
        if (!TasksService.instance)
            TasksService.instance = new TasksService();

        return TasksService.instance;
    }

    constructor() {
        TasksService.nextId = +localStorage.id || 0;
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
        if (!localStorage[task.address]) localStorage[task.address] = '[]';
        let tasks = JSON.parse(localStorage[task.address]);
        tasks.push(task);
        localStorage[task.address] = JSON.stringify(tasks);
        localStorage.id = rawTask.id;
        this.emit();
    }

    update(rawTask) {
        let task = new TaskModel(rawTask);
        console.log('task', task)

        if (!localStorage[task.address]) throw new Error('Cannot find task');
        let tasks = JSON.parse(localStorage[task.address]);
        let taskIndex = tasks.findIndex(t => t.id === task.id);
        if (taskIndex < 0) throw new Error('Cannot find task');
        tasks.splice(taskIndex, 1, task);
        localStorage[task.address] = JSON.stringify(tasks);
        console.log('taskIndex', taskIndex)
        this.emit();
    }

    delete(task) {
        if (localStorage[task.address]) {
            let tasks = JSON.parse(localStorage[task.address]);
            let taskIndex = tasks.findIndex(t => t.id === task.id);
            if (taskIndex >= 0) {
                tasks.splice(taskIndex, 1);
                localStorage[task.address] = JSON.stringify(tasks)
                this.emit();
            }
        }
    }
}