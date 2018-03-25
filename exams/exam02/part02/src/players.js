import hostNames from './config.json';

//gets the players from config 
export const players = [Object.keys(hostNames)[0], Object.keys(hostNames)[1]];
