import React, { Component } from 'react';
// CSS
import './App.css';


// Containers
import Home from "./containers/Home/Home";
import Start from  "./containers/Start/Start";


// Components
// not any in use yet


// initialisation
const apiKey = "beb6f97f52b6ea6335066bfacd31c74c";
const apiEnd = `?api_key=${apiKey}&language=en-US`;
let apiTvUrl = "https://api.themoviedb.org/3/tv/";

let tvList = Array(3);

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
    this.name = response.name;
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
async function dataRun(tvKey, index) {
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

  tvList[index] = localSeriesObjList[0];
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
      "Home",
      "Start"
    ],
    navbarDown: true,
    tvListLength: tvList.length,
    tvList: tvList,
    level: "series",
    levelInt: 0,
    levels: [
      "series",
      "season",
      "episode"
    ],
    selectedSeries: undefined,
    selectedSeason: undefined,
    selectedEpisode: undefined,
  }

  // Lifecycle  
  componentDidMount() {
    //console.log("[App.js] componentDidMount");


    dataRun(66788, 0);
    dataRun(48891, 1);
    dataRun(67136, 2);


    let localList = tvList;
    this.setState({
      tvListLength: localList.length,
      tvList: localList
    })
  }

  
  // Handlers 
  changePositionHandler = (destination) => {
    if (destination === "Home") {
      let newLevelInt = 0;
      this.setState({
        levelInt: newLevelInt,
        level: this.state.levels[newLevelInt]
      })
    }
    this.setState({
      position: destination
    })
  }
  increaseLevelHandler = () => {
    // console.log(this.state.levelInt);
    /*
    if ((this.state.levelInt) < this.state.levels.length) {
      console.log("== -- Line 167 -- ==");
    }
    */
    let newLevelInt = this.state.levelInt + 1;
    this.setState({
      levelInt: newLevelInt,
      level: this.state.levels[newLevelInt]
    })
  }

  setSelectedSeriesHandler = ((obj) => {
    this.setState({
      selectedSeries: obj
    })
  })
  setSelectedSeasonHandler = ((obj) => {
    this.setState({
      selectedSeason: obj
    })
  })
  setSelectedEpisodeHandler = ((obj) => {
    this.setState({
      selectedEpisode: obj
    })
  })

  handlers = {
    changePositionHandler: this.changePositionHandler,
    increaseLevelHandler: this.increaseLevelHandler,
    setSelectedSeriesHandler: this.setSelectedSeriesHandler,
    setSelectedSeasonHandler: this.setSelectedSeasonHandler,
    setSelectedEpisodeHandler: this.setSelectedEpisodeHandler
  }
  

  render() {
    if (this.state.position === this.state.positions[0]) {
      return (
        <Home props={this.state} handlers={this.handlers}/>
      )
    } else if (this.state.position === this.state.positions[1]) {
      return (
        <Start props={this.state} handlers={this.handlers}/>
      )
    }
  }

}

export default App;
