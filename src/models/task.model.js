export default class TaskModel {
    constructor(raw) {
        if (!raw || !raw.id) throw new Error('Cannot create task');

        this.id = raw.id;
        this.address = raw.address ? raw.address : '';
        this.serviceType = raw.serviceType ? raw.serviceType : '';
        this.taskType = raw.taskType ? raw.taskType : '';
        this.taskDescription = raw.taskDescription ? raw.taskDescription : '';
        this.dueDate = raw.dueDate ? raw.dueDate
            : this.getTitle();
    }

    getTitle() {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        let day = days[new Date().getDay() - 1];
        let month = months[new Date().getMonth() - 1];
        let monthNumber = new Date().getDate();
        return `${day}, ${month.slice(0, 3)} ${monthNumber}, ${new Date().toLocaleTimeString()}`
    }
}