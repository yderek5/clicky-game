import React, { Component } from "react";
import "./App.css";
// import components
import Navpills from "./component/Navpills";
import Titlebox from "./component/Titlebox";
import PuppyImages from "./component/PuppyImages";
import Wrapper from "./component/Wrapper";
import puppies from "./puppy.json";

class App extends Component {
        state = {
        puppies,
        currentScore: 0,
        topScore: 0,
        message: "Pet any puppy to start"
    };

    setClicked = id => {

        const clickedMatch = puppies.filter(match => match.id === id);

        if (clickedMatch[0].clicked) {

            for (let i = 0 ; i < puppies.length ; i++) {
                puppies[i].clicked = false;
            }

            this.setState({message: "You already caught that fish.  Start fishing again."});
            this.setState({ currentScore: 0 });
            puppies.sort(function(a, b){return 0.5 - Math.random()});            


        } else if (this.state.currentScore < 11) {

            clickedMatch[0].clicked = true;

            this.setState({currentScore: this.state.currentScore + 1}, () => {
                if (this.state.currentScore > this.state.topScore){
                    this.setState({ topScore: this.state.currentScore });
                }
            });


            puppies.sort(function(a, b){return 0.5 - Math.random()});
            this.setState({currentScore: this.state.currentScore + 1});
            this.setState({message: "Keep casting..."});

        } else {

            this.setState({ topScore: 6 });
            
            for (let i = 0 ; i < puppies.length ; i++){
                puppies[i].clicked = false;
            }

            puppies.sort(function(a, b){return 0.5 - Math.random()});

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
                    {this.state.puppies.map(match => (
                        <PuppyImages
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