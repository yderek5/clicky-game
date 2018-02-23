//boiler plate file from create-react-app 

import React, { Component } from "react";

//don't use logo.svg so get rid of it, only produces warning
//import logo from './logo.svg';

import "./App.css";

/* ********  my files *********** */
// Navpills is the nav bar at top, although it's not really a nav bar 
import Navpills from "./component/Navpills";

// Titlebox, image and text above images 
import Titlebox from "./component/Titlebox";
// images component 
import TroutImages from "./component/TroutImages";

// wrap my trout images to display children 
import Wrapper from "./component/Wrapper";

// my trout information file, array of objects 
import trouties from "./trout.json";

// create a class called App 
class App extends Component {
    
  // set the state of current and top scores - things on the page I'll want to change 
    state = {
        trouties,
        currentScore: 0,
        topScore: 0,
        message: "Catch any fish to start"
    };


    //when clicked on an image, do this stuff. Get the ID from the value id value onclick
    setClicked = id => {

        // create a variable that holds the matched ID from my array.  There is only
        //one so it will always be in position [0]. ID comes from the input in my render
        const clickedMatch = trouties.filter(match => match.id === id);

/* ************** if the matched ID is already clicked (true) then the game  is over  ******** */
        if (clickedMatch[0].clicked) {

            //reset all of my clicked values in my trouties array to false
            for (let i = 0 ; i < trouties.length ; i++) {
                trouties[i].clicked = false;
            }

            //you are a loser, reset to the current score to 0
            this.setState({message: "You already caught that fish.  Start fishing again."});
            this.setState({ currentScore: 0 });
            //sort the array again for another game.  Just copied this sort function from SO, seems to work.
            trouties.sort(function(a, b){return 0.5 - Math.random()});            

/* ***************** Otherwise, if ID clicked = false, and it's less than 12 pics...  ************* */

        } else if (this.state.currentScore < 11) {

            // change the clicked value from false to true
            clickedMatch[0].clicked = true;

            //add to the currentScore, and then check the if currentScore is more than topScore
            //interesting in that I had to put this second part in a function as setState is async
            this.setState({currentScore: this.state.currentScore + 1}, () => {
                // if currentScore > topScore, change topScore to currentScore.  
                if (this.state.currentScore > this.state.topScore){
                    this.setState({ topScore: this.state.currentScore });
                }
            });


            // Shuffle the array to be rendered in a random order
            trouties.sort(function(a, b){return 0.5 - Math.random()});
            //update the current score
            this.setState({currentScore: this.state.currentScore + 1});
            //don't really need to update this every time but can't find a better way
            this.setState({message: "Keep casting..."});

/* ****************** Or, you've caught all twelve fish and the game is over anyway ***************** */            
        } else {

            // Set the topScore to the top score it can be.  
            this.setState({ topScore: 12 });
            
            //reset all of my clicked values in my trouties array to false
            for (let i = 0 ; i < trouties.length ; i++){
                trouties[i].clicked = false;
            }

            //shuffle up again
            trouties.sort(function(a, b){return 0.5 - Math.random()});

            // Set currentScore to 0, winner winner fishy dinner message
            this.setState({currentScore: 0});
            this.setState({message: "You caught them all, start over!"});            

        }
    };

    render() {
        return (

            <div>

                <Navpills 
                    message={this.state.message}
                    currentScore={this.state.currentScore}
                    topScore={this.state.topScore}   
                />

                <Titlebox />

                <Wrapper>
                    {this.state.trouties.map(match => (
                        <TroutImages
                            setClicked={this.setClicked}
                            id={match.id}
                            key={match.id}
                            image={match.image}
                        />
                    ))}
                </Wrapper>

            </div>            
        );
    }
}

export default App;