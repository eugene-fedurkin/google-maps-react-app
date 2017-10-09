import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    removeNotActive = (event) => {
        let parent = event.target.parentElement.parentElement.children;
        console.log(parent.length)
        for (let i = 0; i < parent.length; i++) {
            if (parent[i].classList.contains('activeLink')) {
                console.log(parent[i])
                parent[i].classList.remove('activeLink');
                console.log(parent[i])
                
                return;
            }
        }
    }
    
    toActiveLink = (event) => {
        this.removeNotActive(event);
        event.target.parentElement.classList.add('activeLink');
    }

    render() {
        return(
            <div>
                <ul>
                    <li><Link onClick={this.toActiveLink} className="nav" to="job">JobUp</Link></li>
                    <li><Link onClick={this.toActiveLink} className="nav" to="/">DASHBOARD</Link></li>
                    <li><Link onClick={this.toActiveLink} className="nav" to="history">HISTORY</Link></li>
                    <li><Link onClick={this.toActiveLink} className="nav" to="profile">PROFILE</Link></li>
                </ul>
            </div>
        )
    }
}