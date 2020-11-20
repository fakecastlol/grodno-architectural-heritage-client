import React, {Component} from 'react';

export default class Home extends Component {
    static displayName = Home.name;

    constructor(props){

        super(props);
    }

    render () {
        return (
            <div>
                <h3>welcome to the club buddy</h3>
            </div>
        )
    }
}