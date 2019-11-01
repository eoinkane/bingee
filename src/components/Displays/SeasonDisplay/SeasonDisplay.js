import React from "react";

const SeasonDisplay = ((season) => {
    //if episode.
    console.log(season);
    let apiImgUrl = "https://image.tmdb.org/t/p/w300/";
    return(
        <div className="displayTable">
            <ul className="list-group" id="info-list">
                <li className="list-group-item" id="displaySeries">Series: {season.season.series}</li>
                <li className="list-group-item" id="displaySeasonNumber">Season Number: {season.season.number}</li>
                <li className="list-group-item" id="displaySeasonTitle">Title: {season.season.season}</li>
                <li className="list-group-item" id="displayNumberOfEpisodes">Number of Episodes: {season.season.numberOfEpisodes}</li>
                <li className="list-group-item" id="displayDuration">Duration: {season.season.duration}</li>
                <li className="list-group-item" id="displayAirDate">Air Date: {season.season.airDate}</li>
                <li className="list-group-item" id="displayOverview">Overview:<br></br> {season.season.overview}</li>
            </ul>
            <div className="text-center seasonIMG">
                <img id="seasonIMG" className="rounded" src={apiImgUrl + season.season.imagePath} style={season.imgStyle}alt="Season IMG"></img>
            </div>
        </div>
    )
})

export default SeasonDisplay;