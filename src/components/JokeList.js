import React, { Component } from "react";
import Joke from "./Joke";
//import '../styles/ToDo.css';

const axios = require('axios').default;

class JokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        //this.done = this.done.bind(this);
    }

    async componentDidMount(){
        let response = await axios.get("https://icanhazdadjoke.com/",
         {headers: {Accept: "application/json"}}); //This is line is specific to this API? Soemthing to do with how the data is structured? 
          console.log(response.data.joke)
      } 

    render() {
        return (
            <div>
                <h1>Joke List</h1>
                <Joke />
            </div>

        )
    }
}

export default JokeList;