import React, { Component } from "react";
import '../styles/Joke.css';

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        //this.done = this.done.bind(this);
    }

    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
<i className="fas fa-arrow-up" />
<br />
    <span>{this.props.votes}</span>
    <br />
    <i className="fas fa-arrow-down" />
                </div>
                <div className="Joke-text">  
{this.props.text}
                </div>
            </div>
        )
    }
}

export default Joke;