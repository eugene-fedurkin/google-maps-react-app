import React,{Component} from 'react';


export default class TasksLists extends Component {
    constructor() {
        super();
        this.state = {
            electiciant: ['exterior lighting', 'Interior lighting', 'install outlet'],
            plumber: ['Unblock a toilet', 'Unblock a sink', 'Fix a water leak', 'Install a sink', 'Install a shower', 'Install a toilet'],
            gardener: ['Raising plants', 'weeding flower beds', 'planting flower', 'pruning shrubs', 'pruning trees', 'checking the health of plants'],
            housekeeper: ['tidy up rooms', 'wash windows as scheduled', 'wash dishes', 'clean appliances', 'care for household pets', 'dispose of trash'],
            cook: ['cooking advice', 'buy food'],
            currentTask: null
        }
    }

    pickedTask = (event) => {
        const parent = event.target.parentElement.children;
        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.contains('clickedTaskBtn') && parent[i].classList.remove('clickedTaskBtn');
        }
        event.target.classList.add('clickedTaskBtn');
        this.props.getTask(event.target.innerText);
    }

    render() {
        let tasks;
        if (this.props.service) {
            tasks = this.state[this.props.service].map(task =>
                <button key={task} onClick={this.pickedTask}>{task}</button>
            );
        }
        return(
            
                <div>
                    <h2>SOME TASKS</h2>
                    <div className="content">
                        {tasks || 'You need to choose a service'}
                    </div>
                </div>

        )
    }
}