import React from "react";

const EpisodeDisplay = ((episode) => {
    //if episode.
    return(
        <div className="displayTable">
            <ul className="list-group" id="info-list">
                <li className="list-group-item" id="displaySeries">Series: {episode.episode.series}</li>
                <li className="list-group-item" id="displaySeasonNumber">Season Number: {episode.episode.season}</li>
                <li className="list-group-item" id="displayEpisodeNumber">Episode Number: {episode.episode.number}</li>
                <li className="list-group-item" id="displayEpisodeTitle">Title: {episode.episode.title}</li>
                <li className="list-group-item" id="displayDuration">Duration: {episode.episode.duration}</li>
                <li className="list-group-item" id="displayAirDate">Air Date: {episode.episode.airDate}</li>
                <li className="list-group-item" id="displayOverview">Overview:<br></br> {episode.episode.overview}</li>
            </ul>
        </div>
    )
})

export default EpisodeDisplay;