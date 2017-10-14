import React,{Component} from 'react';

export default class TaskTypes extends Component {
    selectTaskType = (taskType) => {
        this.props.onTaskTypeSelected(taskType);
    };

    render() {
        let tasks;
        if (taskTypes[this.props.serviceType]) {
            tasks = taskTypes[this.props.serviceType].map(taskType =>
                <button key={taskType} onClick={() => this.selectTaskType(taskType)}
                    className={taskType === this.props.taskType
                        ? 'clickedTaskBtn' : ''}>
                    {taskType}
                </button>
            );
        }
        return (
            <div>
                <h2>{this.props.serviceType.toUpperCase()} TASKS</h2>
                <div className="content">
                    {tasks || 'You need to choose a service'}
                </div>
            </div>
        );
    }
}

const taskTypes = {
    Electrician: ['Exterior lighting',
        'Interior lighting',
        'Install outlet'],
    Plumber: ['Unblock a toilet',
        'Unblock a sink',
        'Fix a water leak',
        'Install a sink',
        'Install a shower',
        'Install a toilet'],
    Gardener: ['Raise plants',
        'Weed flower beds',
        'Plant a flower',
        'Prune shrubs',
        'Prune trees',
        'Check the health of plants'],
    Housekeeper: ['Tidy up rooms',
        'Wash windows as scheduled',
        'Wash the dishes',
        'Clean appliances',
        'Take care of household pets',
        'Dispose of trash'],
    Cook: ['Cook a dinner',
        'Cook a supper']
};