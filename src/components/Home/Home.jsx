import React, {Component} from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props){

        super(props);
    }

    render () {
        return (
            <div style={{marginTop: "10em"}}>
                <h3>welcome to the club buddy</h3>
            </div>
        )
    }
}