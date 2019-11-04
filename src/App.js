import React, { Component } from 'react';
// CSS
import './App.css';


// Containers
import Home from "./containers/Home/Home";
import Start from  "./containers/Start/Start";
import Chosen from  "./containers/Chosen/Chosen";



// Components
// not any in use yet


// initialisation
const apiKey = "beb6f97f52b6ea6335066bfacd31c74c";
const apiEnd = `?api_key=${apiKey}&language=en-US`;
let apiTvUrl = "https://api.themoviedb.org/3/tv/";

let apiImgUrl = "https://image.tmdb.org/t/p/";

let tvListKeys = [
  66788,
  48891,
  67136,
  71446,
  66857,
  67026,
  68006,
  66732,
  1421,
  2288,
  37680,
  73375,
  1100,
  60797,
  1420,
  74577,
  81356,
  1403,
  85552,
  80743,
  61381,
  62649,
  4589,
  1417,
  69740,
  59186,
  40026,
  8514,
  66292,  

]
//let tvList = Array(7);
let tvList = Array(tvListKeys.length);

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
    this.airDate = response.air_date;
    this.imagePath = response.poster_path;
    this.overview = response.overview;
  }
}

class episode {
    constructor(response, name, duration) {
    this.number = response.episode_number;
    this.title = response.name;
    this.series = name;
    this.season = response.season_number;
    this.duration = duration;
    this.airDate = response.air_date;
    this.overview = response.overview;
  }
}


// data section 
// main
async function dataRun(tvKey, index) {
  let tvDataRun = [];
  let seasonsDataRun = [];

  
  await fetchTvData(tvKey, tvDataRun);
  await fetchSeasonData(tvDataRun, seasonsDataRun);
  
  //console.log(seasonsDataRun);
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

  /* // testing if // if needed to check a response of certain series
  if (index === /\test index/\) {
    console.log(tvDataRun);
    console.log(seasonsDataRun);
  }
  */
  tvList[index] = localSeriesObjList[0];
}



// fetch data function
async function fetchTvData(tvKey, tvDataRun) {
  await fetch(apiTvUrl + tvKey + apiEnd)
    .then(response1 => response1.json())
    .then(data1 => tvDataRun.push(data1))
}
async function fetchSeasonData(tvDataRun, seasonsDataRun) {
  if (tvDataRun[0].seasons.length === 1) {
    //console.log("Line 131 only one season");
    await fetch(apiTvUrl + tvDataRun[0].id + "/season/" + 1 + apiEnd)
      .then(response2 => response2.json())
      .then(data2 => seasonsDataRun.push(data2))
  } else {
    for (let i = 1; i < tvDataRun[0].seasons.length; i++) {
      await fetch(apiTvUrl + tvDataRun[0].id + "/season/" + i + apiEnd)
        .then(response2 => response2.json())
        .then(data2 => seasonsDataRun.push(data2))
    }

  }
}




class App extends Component {
  state = {
    position: "Home",
    prevPosition: "Home",
    positions: [
      "Home",
      "Start",
      "Chosen"
    ],
    navbarDown: true,
    dataLoaded: false,
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
    selectedEpisodePrev: undefined,
    selectedEpisode: undefined,
    selectedEpisodeNext: undefined,
    prevBtnClicked: "homeBtn",
    api: {
      apiImgUrl: apiImgUrl
    }
  }

  // Lifecycle  
  componentDidMount() {
    //console.log("[App.js] componentDidMount");

    for (let i = 0; i < tvListKeys.length; i++) {
      setTimeout(() => {
        dataRun(tvListKeys[i], i);       
      }, 25);
      if (i === tvListKeys.length -1) {
        console.log("== -- SYSTEM -- ==\n\n\tData Loaded\t\n\tProceed\n\n== -- SYSTEM -- ==");
        this.setState({
          dataLoaded: true
        })
      }
    }


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
      prevPosition: this.state.position,
      position: destination
    })
  }
  changePrevBtnClickedKeyHandler = ((btnClickedID) => {
    this.setState({
      prevBtnClicked: btnClickedID
    })
  })
  prevPositionHandler = () => {
    if (this.state.position === this.state.positions[1]) {
      if (this.state.level === this.state.levels[0]) {
        let previousPositionLocal = this.state.position;
        this.setState({
          prevPosition: previousPositionLocal,
          position: this.state.prevPosition
        })
      } else {
        this.setState({
          prevPosition: this.state.position,
          position: this.state.position,
          level: this.state.levels[this.state.levelInt-1],
          levelInt: this.state.levelInt - 1
        })
      }
    } else if (this.state.position === this.state.positions[2]) {
      console.log("Line 235");
      console.log(this.state.prevBtnClicked);
      if (this.state.prevBtnClicked === "previousBtn") {
        //this.handlers.setSelectedEpisodeHandler(this.props.props.selectedEpisodePrev, this.props.props.selectedSeason)
        // go to the next episode
        console.log(" go to the next episode");
        this.handlers.setSelectedEpisodeHandler(this.state.selectedEpisodeNext, this.state.selectedSeason);
      } else if (this.state.prevBtnClicked === "nextBtn") {
        // go  to the previous episode
        console.log(" go to the previous episode");
        this.handlers.setSelectedEpisodeHandler(this.state.selectedEpisodePrev, this.state.selectedSeason);
      } else {
        let previousPositionLocal = this.state.position;
        this.setState({
          prevPosition: previousPositionLocal,
          position: this.state.prevPosition
        })
      }
    } else {
      let previousPositionLocal = this.state.position;
      this.setState({
        prevPosition: previousPositionLocal,
        position: this.state.prevPosition
      })
    }
  }
  restartHandler = () => {
    this.setState({
      position: "Home",
      prevPosition: "Home",
      level: "series",
      levelInt: 0,
      selectedSeries: undefined,
      selectedSeason: undefined,
      selectedEpisodePrev: undefined,
      selectedEpisode: undefined,
      selectedEpisodeNext: undefined

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
  setSelectedSeasonHandler = ((obj, parentObj) => {
    
    this.setState({
      selectedSeason: obj
    })
  })
  setSelectedEpisodeHandler = ((obj, parentObj) => {
    let objIndex = obj.number - 1;
    //if obj
    let previousEpisodeLocal = parentObj.episodes[(objIndex) - 1];
    let nextEpisodeLocal = parentObj.episodes[(objIndex) + 1];

    this.setState({
      selectedEpisodePrev: previousEpisodeLocal,
      selectedEpisode: obj,
      selectedEpisodeNext: nextEpisodeLocal
    })
  })
  checkIfNextEpisodeUndefinedHandler = ((obj, parentObj) => {
    let objIndex = obj.number - 1;

    let nextEpisodeLocal = parentObj.episodes[(objIndex) + 1];

    if (nextEpisodeLocal === undefined) {
      return true;
    } else {
      return false;
    }
  })
  checkIfPrevEpisodeUndefinedHandler = ((obj, parentObj) => {
    let objIndex = obj.number - 1;

    let prevEpisodeLocal = parentObj.episodes[(objIndex) - 1];

    if (prevEpisodeLocal === undefined) {
      return true;
    } else {
      return false;
    }
  })


  handlers = {
    changePositionHandler: this.changePositionHandler,
    increaseLevelHandler: this.increaseLevelHandler,
    setSelectedSeriesHandler: this.setSelectedSeriesHandler,
    setSelectedSeasonHandler: this.setSelectedSeasonHandler,
    setSelectedEpisodeHandler: this.setSelectedEpisodeHandler,
    checkIfPrevEpisodeUndefinedHandler: this.checkIfPrevEpisodeUndefinedHandler,
    checkIfNextEpisodeUndefinedHandler: this.checkIfNextEpisodeUndefinedHandler,
    restartHandler: this.restartHandler,
    prevPositionHandler: this.prevPositionHandler,
    changePrevBtnClickedKeyHandler: this.changePrevBtnClickedKeyHandler
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
    } else if (this.state.position === this.state.positions[2]) {
      return (
        <Chosen props={this.state} handlers={this.handlers} />
      )
    }
  }

}

export default App;
