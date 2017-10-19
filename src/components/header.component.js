import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'DASHBOARD'
        }
    }

    toActiveLink = (tab) => {
        this.setState({selectedTab: tab});
    };

    render() {
        const tabs = ['JobUp', 'DASHBOARD', 'HISTORY', 'PROFILE'];
        const routing = ['job', '/', 'history', 'profile'];
        return (
            <header>
                <ul>
                    {tabs.map((tab, index) => 
                    <li key={index} 
                        className={this.state.selectedTab === tab ? 'nav activeLink' : 'nav'}>
                        <Link onClick={() => this.toActiveLink(tab)}
                            to={routing[index]}>
                            {tab}
                        </Link>
                    </li>
                    )}
                </ul>
            </header>
        );
    }
}