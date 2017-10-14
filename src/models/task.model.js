export default class TaskModel {
    constructor(raw) {
        if (!raw || !raw.id) throw new Error('Cannot create task');

        this.id = raw.id;
        this.address = raw.address ? raw.address : '';
        this.serviceType = raw.serviceType ? raw.serviceType : '';
        this.taskType = raw.taskType ? raw.taskType : '';
        this.taskDescription = raw.taskDescription ? raw.taskDescription : '';
        this.dueDate = raw.dueDate ? raw.dueDate
            : (new Date(Date.now() + (1000 * 60 * 60 * 24))).toLocaleString();
    }

    getTitle() {
        let text = 'I need a ';
        if (this.serviceType) {
            text += `${this.serviceType} to `
            if (this.taskType) text += this.taskType;
        }

        return text;
    }
}