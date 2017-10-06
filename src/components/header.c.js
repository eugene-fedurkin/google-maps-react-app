import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return(
            <div>
                <ul>
                    <li><Link className="nav" to="job">JobUp</Link></li>
                    <li><Link className="nav" to="/">DASHBOARD</Link></li>
                    <li><Link className="nav" to="history">HISTORY</Link></li>
                </ul>
            </div>
        )
    }
}