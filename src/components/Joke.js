import React, { Component } from "react";
import '../styles/Joke.css';

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        //this.getEmoji = this.getEmoji.bind(this);
    }

    getColor() {
        if (this.props.votes >= 15) {
            return "green"
        } else if (this.props.votes >= 12) {
            return "chartreuse"
        } else if (this.props.votes >= 9) {
            return "gold"
        } else if (this.props.votes >= 6) {
            return "orange"
        } else if (this.props.votes >= 3) {
            return "orangered"
        } else if (this.props.votes >= 0) {
            return "red"
        } else {
		return "DarkRed"
		}
    }

    getEmoji() {
        if (this.props.votes >= 15) { //These are all names of emojis from https://emoji-css.afeld.me/, the link to this is imported in the html doc.
            return "em-rolling_on_the_floor_laughing"
        } else if (this.props.votes >= 12) {
            return "laughing"
        } else if (this.props.votes >= 9) {
            return "smiley"
        } else if (this.props.votes >= 6) {
            return "slightly_smiling_face "
        } else if (this.props.votes >= 3) {
            return "neutral_face  "
        } else if (this.props.votes >= 0) {
            return "confused"
        } else {
            return "angry"
        }
    }

    render() {
        return (
            <div className="Joke">
                <div className="Joke-text">
                    {this.props.text} <i class={"Joke-emoji em em-" + this.getEmoji()} ></i> {/*functions the same way as the color system the em things are from the emoji css you imported, the words chosen by getEmoji complete the invocation.*/}
                </div>
                <br />
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote} />
                    <br />
                    <span style={{borderColor: this.getColor()}} className="Joke-score">{this.props.votes}</span>
                    <br />
                    <i className="fas fa-arrow-down" onClick={this.props.downvote} />
                </div>
            </div>
        )
    }
}

export default Joke;