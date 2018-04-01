import React, { Component } from 'react';
import './App.css';

import hostNames from './config.json';
import {players} from './players';

import {postGame, putGameGuess, getResult, deleteGameSession} from './game-services';
import {pickErrorMessage} from './messages';

import GGLabel from './GGLabel';
import GGList from './GGList';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            status : 'start',
            error : null
        };

        this.state[players[0]] = {};
        this.state[players[1]] = {};
        this.currentPlayer = players[0];

        this.startButtonListener = this.startButtonListener.bind(this);
        this.resetButtonListener = this.resetButtonListener.bind(this);
    }


    loadGame() {
        // gets the initial data from server and starts the game
        postGame(hostNames[this.currentPlayer])
        .catch( error => this.handleError(error))
        .then( data => this.handlePlayerData(data))
        .then( () => this.changePlayer())
        .then( () => postGame(hostNames[this.currentPlayer]))
        .then( data => this.handlePlayerData(data))
        .then( () => this.changePlayer())
        .then( () => this.playGame());
    }

    changePlayer(){
        // toggles from current player to his opponent
        let player = null
        if(this.currentPlayer === players[0]){
            player = players[1];
        }else {
            player = players[0];
        }
        this.currentPlayer = player;
    }

    handlePlayerData( data ){
        // handles the current player data and sets the state of app
        const player = this.currentPlayer;

        const state = {};
        state[player] = data;
        state[player].results = [];
        state[player].noOfTurns = 0;

        this.setState(state);
    }

    handleError(error){
        this.setState({error : error});
    }

    playGame(){
        if( this.state.error) return ;
        // the play goes in turns from each player
        if( this.state.status !== 'playing' ) return ;

        this.getPlayerGuess()
        .catch( error => this.handleError(error))
        .then( () => {
            if(this.state.status === 'playing'){
                this.playGame();
            }
        });
    }

    getPlayerGuess(){
        // gets the current player guess from server
        const player = this.state[this.currentPlayer];
        const opponent = this.state[this.getOpponent()];
        const matched = opponent.response;

        const data = (matched || matched === 0) ? { matched : matched } : {};

        return putGameGuess( hostNames[this.currentPlayer], player.id, data)
        .then( guessData => this.handlePlayerGuess(guessData))
        .then( () => this.changePlayer())
        .catch( error => this.handleError(error));
    }

    handlePlayerGuess( data ){
        // handles the current players guess by sending to opponent for evaluation
        const opponent = this.state[this.getOpponent()];

        return (
            getResult( hostNames[this.getOpponent()], opponent.id, data.guess)
            .catch( error => this.handleError(error))
            .then( result => this.handleResult( data.guess, result) )
        );

    }

    handleResult( guess, resultData ){
        // handles the result sent by opponent for the current player's guess
        const opponent = this.state[this.getOpponent()];
        opponent.response = resultData.matched;

        const player = this.state[this.currentPlayer];
        player.noOfTurns += 1;

        const result = {
            guess : guess,
            matched : resultData.matched
        };

        player.results.push( result );

        const state = {};
        state[this.currentPlayer] = player;
        state[this.getOpponent] = opponent;

        if(resultData.hasWon ){
            state.status = 'won';
        }

        this.setState(state);

    }


    getOpponent(){
        // returns the opponent of current player
        return (this.currentPlayer === players[0]) ? players[1] : players[0];
    }

    startButtonListener(){
        // on click sets the state of game to play
        this.setState({ status : 'playing'},()=>{
            this.loadGame();
        })
    }

    resetButtonListener(){
        // resets the state of the game to initial and deletes any previous game sessions on the servers
        const currentPlayer = this.state[this.currentPlayer];
        const opponent = this.state[this.getOpponent()];

        deleteGameSession(hostNames[this.currentPlayer], currentPlayer.id )
        .then( () => deleteGameSession(hostNames[this.getOpponent()], opponent.id ))
        .then( () => {
            const state = {
                status : 'start',
                error : null
            };

            state[players[0]] = {};
            state[players[1]] = {};
            this.currentPlayer = players[0];

            this.setState(state);
        });
    }

    renderButton(){
        // renders the button for various states of the game
        if(this.state.status === 'start'){
            return(
                <button onClick={this.startButtonListener}> Start</button>
            );
        }

        if(this.state.status === 'playing'){
            return '';
        }

        return(
            <button onClick={this.resetButtonListener}> New Game</button>
        );

    }

    renderErrorMessages(){
        if(!this.state.error) return '';
        let message = pickErrorMessage(this.state.error);
        return (
            <span className='error-messages'>
                <p>{message}</p>
                <button onClick={this.resetButtonListener}>
                    New Game
                </button>
            </span>
        );
    }

    render() {
        return (
          <div className='app'>
            <header>
                <h1>Welcome to Guessing Game</h1>
            </header>

            {this.renderErrorMessages()}

            <p className='game-status'>
                {this.state.status === 'won' ? `won by ${this.currentPlayer}` : '' }
            </p>
            {this.renderButton()}
            <div className='player-holder'>
                <div className='player alfred'>
                    <h3>ALFRED</h3>
                    <GGLabel secretWord={this.state[players[0]].secret} />
                    <p> No of turns : {this.state[players[0]].noOfTurns}</p>
                    <GGList results={this.state[players[0]].results}/>
                </div>

                <div className='player barbara'>
                    <h3>BARBARA</h3>
                    <GGLabel secretWord={this.state[players[1]].secret} />
                    <p> No of turns : {this.state[players[1]].noOfTurns}</p>
                    <GGList results={this.state[players[1]].results} />
                </div>

            </div>

          </div>
        );
    }
}

export default App;
