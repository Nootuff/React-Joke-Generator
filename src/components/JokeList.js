import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
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
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]" ), //If there are jokes in the "jokes" item in localStorage, set state to them or else just have an empty array.
            loading: false 
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() { //If jokes is empty call the getJokes function somehow. 
        if (this.state.jokes.length === 0) this.getJokes()
    }

    async getJokes() {
        let jokesHolder = [];
        while (jokesHolder.length < this.props.numOfJokes) {//This is a while loop because we may have to loop more than 10 times to get 10 UNIQUE jokes. 
            let response = await axios.get("https://icanhazdadjoke.com/", //New API call on each loop of the while.
                { headers: { Accept: "application/json" } }); //This is line is specific to this API? Soemthing to do with how the data is structured in the api? 
            console.log(response.data.joke)
            jokesHolder.push({ id: uuidv4(),/*uuid is imported above, an npm package to create a random id number*/ jokeText: response.data.joke, votes: 0 }); //Pushes an object into the array with 3 values, "jokeText" set to the data retrieved form the API and "votes" & an id.
        }
        this.setState(oldState => ({
            jokes: [...oldState.jokes, ...jokesHolder] //Send the new of jokes array to state and add it to the existing jokes already there. 
            }),
            ()=> window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)) //This waits until the state is updated then sends the updated state with all the new jokes added to the old to localStorage. 
            ); 
    }

    handleVote(id, change) {
        this.setState(
            oldState => ({ //No idea what's happening here oldState is a parameter that access the state before this update?
                jokes: oldState.jokes.map(j => j.id === id ? { ...j, votes: j.votes + change } : j) //Works like a for loop, for each existing joke in the state, check to see if its id matches the id that was passed in by the function. If it does, return the rest of the existing joke (represented by the ... just like how this works in an array) but set the votes value to be its original value + whatever value was determeined by the "change" argument. If id doesn't match, return j, the original joke un changed. This starting with jokes: means this whole thing is setting the value of jokes to the result of this map. 
            }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))//This runs after the thing with oldState runs, it updates the localStorage with the new vote count. 
            );
    }

    handleClick(){
        this.setState({loading: true});
        this.getJokes();
    }

    render() {
        return (
            <div className="JokeList">
                <h1>Joke List</h1>
                <button onClick={this.handleClick}>Get more jokes</button>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => (
                        <Joke key={j.id} votes={j.votes} text={j.jokeText} upvote={() => this.handleVote(j.id, 1)} /*this is the upvote, adds in the joke id to find the correct joke, and 1 to */ downvote={() => this.handleVote(j.id, -1)} />
                    ))}

                </div>
            </div>

        )
    }
}

export default JokeList;