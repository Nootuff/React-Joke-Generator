import React, { Component } from "react";
import Joke from "./Joke";
import '../styles/JokeList.css';

const axios = require('axios').default;

class JokeList extends Component {
    static defaultProps = {
        numOfJokes: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
        };
        //this.done = this.done.bind(this);
    }

    async componentDidMount() {
        let jokesHolder = [];
        while (jokesHolder.length < this.props.numOfJokes) {//This is a while loop because we may have to loop more than 10 times to get 10 UNIQUE jokes. 
            let response = await axios.get("https://icanhazdadjoke.com/", //New API call on each loop of the while.
                { headers: { Accept: "application/json" } }); //This is line is specific to this API? Soemthing to do with how the data is structured in the api? 
            console.log(response.data.joke)
            jokesHolder.push({jokeText: response.data.joke, votes: 0}); //Pushes an object into the array with 2 values, "jokeText" set to the data retrieved form the API and "votes".
        }
        this.setState({ jokes: jokesHolder }); //Send the array to state.
    }

    render() {
        return (
            <div className="JokeList">
                <h1>Joke List</h1>
                <div className="JokeList-jokes">
                    {this.state.jokes.map( j => (
                       <Joke votes={j.votes} text={j.jokeText} />
                    ))}
                    
                </div>
            </div>

        )
    }
}

export default JokeList;