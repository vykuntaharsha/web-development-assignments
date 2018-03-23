import React, { Component } from 'react';
//css
import './App.css';
import './css/button.css';
import './css/list.css';
import './css/input.css';

//logic and server functions
import { getSecretWordId, evaluateGuess } from './services/wordListService';
import {pickErrorMessage} from './messages';
import {setButtonMode} from './gc-config-button';

//components
import GCHeader from './GCHeader';
import GCMainControls from './GCMainControls';
import GCList from './GCList';
import GCMessageSpan from './GCMessageSpan';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            secretWordId : null,
            playerGuess : '',
            gameStatus : 0,
            results : [],
            message : null
        };

        // bind this inside of functions to app
        this.setPlayerGuess = this.setPlayerGuess.bind(this);
        this.fetchResult = this.fetchResult.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentWillMount(){
        this.fetchSecretWordId();
    }

    fetchSecretWordId(){
        // fetches the secret word id from server
        getSecretWordId()
        .then( data => this.handleSecretWordId( data.id ))
        .catch( error => this.handleMessage( error ));
    }

    handleSecretWordId( id ){
        // sets the secret word to state of app and prints to console
        this.setState({ secretWordId : id });
        console.log( id );
    }

    handleMessage( message ){
        // sets the message during various stages of the game
        this.setState({ message });
    }

    fetchResult(){
        // fetches the result from server
        evaluateGuess( this.state.playerGuess, this.state.secretWordId )
        .then( data => this.handleResults( data.result ))
        .catch( error => this.handleMessage( error ) );
    }

    handleResults( resultObtained ){
        // sets the obtained result to state of app
        const result = {};
        result.playerGuess = this.state.playerGuess;
        result.noOfCommonLetters = resultObtained.noOfCommonLetters;

        const message = (resultObtained.status) ? 'player-won' : null;
        this.setState({
            playerGuess : '',
            results : [...this.state.results, result],
            gameStatus : resultObtained.status,
            message : message
        });

    }

    setPlayerGuess( guess ){
        // sets the playes guess to state of app
        this.setState({ playerGuess : guess });
    }

    resetGame(){
        // resets the game to initial state
        this.setState({
            secretWordId : null,
            playerGuess : '',
            gameStatus : 0,
            results : [],
            message : null
        });
        this.fetchSecretWordId();
    }

  render() {
    // changes the button mode by state of the game
    const buttonMode = setButtonMode(this.state.gameStatus, this.fetchResult, this.resetGame);

    return (
      <div className="app">
        <GCHeader title="Welcome to guessing game" />
        <div className="game">
            <GCMessageSpan status={pickErrorMessage(this.state.message)} />
            <GCMessageSpan status={this.state.results.length} />
            <GCMainControls
                playerGuess = {this.state.playerGuess}
                buttonLabel = {buttonMode.label}
                onClick = {buttonMode.onClick}
                setPlayerGuess = {this.setPlayerGuess}
            />
        </div>
        <h1>Your previous guesses</h1>
        <GCList results={this.state.results}/>
      </div>
    );
  }
}

export default App;
