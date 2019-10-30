import React, { Component } from 'react';
// CSS
import './App.css';


// Containers
import Home from "./containers/Home/Home";


// Components
// not any in use yet


// initialisation
const apiKey = "beb6f97f52b6ea6335066bfacd31c74c";
const apiEnd = `?api_key=${apiKey}&language=en-US`;
let apiTvUrl = "https://api.themoviedb.org/3/tv/";

let tvList = [];

class series {
  constructor(response, seasons) {
    this.tvListNumber = (tvList.length + 1);
    this.title = response.name;
    this.numberOfSeasons = response.number_of_seasons;
    this.numberOfEpisodes = response.number_of_episodes;
    this.seasons = seasons;
    this.duration = (response.episode_run_time[0] * response.number_of_episodes);
  }
}

class season {
  constructor(response, name, duration, episodes) {
    this.number = response.season_number;
    this.season = (name + " " + response.name);
    this.series = name;
    this.numberOfEpisodes = response.episodes.length;
    this.episodes = episodes;
    this.duration = this.numberOfEpisodes * duration;
  }
}

class episode {
    constructor(response, name, duration) {
    this.number = response.episode_number;
    this.title = response.name;
    this.series = name;
    this.season = response.season_number;
    this.duration = duration;
  }
}


// data section 
// main
async function dataRun(tvKey) {
  let tvDataRun = [];
  let seasonsDataRun = [];

  
  await fetchTvData(tvKey, tvDataRun);
  await fetchSeasonData(tvDataRun, seasonsDataRun);
  
  let localSeasonsEpisodesObjList = [];

  for (let o = 0; o < seasonsDataRun.length; o++) {
    let localEpisodesObjList = [];
    for (let i = 0; i < seasonsDataRun[o].episodes.length; i++) {
      let newEpisodeObj = new episode(seasonsDataRun[o].episodes[i], tvDataRun[0].name, tvDataRun[0].episode_run_time[0]);
      localEpisodesObjList.push(newEpisodeObj);
    }
    localSeasonsEpisodesObjList.push(localEpisodesObjList);
  }

  let localSeasonsObjList = [];
  for (let i = 0; i < seasonsDataRun.length; i++) {
    let newSeasonObj = new season(seasonsDataRun[i], tvDataRun[0].name, tvDataRun[0].episode_run_time[0], localSeasonsEpisodesObjList[i]);
    localSeasonsObjList.push(newSeasonObj);
  }

  let localSeriesObjList = [];
  for (let i = 0; i < tvDataRun.length; i++) {
    let newSeriesObj = new series(tvDataRun[i], localSeasonsObjList, );
    localSeriesObjList.push(newSeriesObj);
  }

  tvList.push(localSeriesObjList[0]);
}



// fetch data function
async function fetchTvData(tvKey, tvDataRun) {
  await fetch(apiTvUrl + tvKey + apiEnd)
    .then(response1 => response1.json())
    .then(data1 => tvDataRun.push(data1))
}
async function fetchSeasonData(tvDataRun, seasonsDataRun) {
  for (let i = 1; i < tvDataRun[0].seasons.length; i++) {
    await fetch(apiTvUrl + tvDataRun[0].id + "/season/" + i + apiEnd)
      .then(response2 => response2.json())
      .then(data2 => seasonsDataRun.push(data2))
  }
}




class App extends Component {
  state = {
    position: "Home",
    positions: [
      "Home"
    ],
    navbarDown: true,
    tvList: tvList
  }

  // Lifecycle  
  componentDidMount() {
    console.log("[App.js] componentDidMount");
    dataRun(66788);
    dataRun(48891);
    console.log(this.state.tvList);
  }

  
  // Handlers 
  changePositionHandler = (destination) => {
    this.setState({
      position: destination
    })
  }

  handlers = {
    changePositionHandler: this.changePositionHandler
  }
  

  render() {
    if (this.state.position === this.state.positions[0]) {
      return (
        <Home props={this.state} handlers={this.handlers}/>
      )
    } 
  }

}

export default App;
