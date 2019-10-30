import React from "react";

const EpisodeDisplay = ((episode) => {
    return(
        <div className="displayTable">
            <ul className="list-group" id="info-list">
                <li className="list-group-item" id="displaySeries">Series: {episode.episode.series}</li>
                <li className="list-group-item" id="displaySeasonNumber">Season Number: {episode.episode.season}</li>
                <li className="list-group-item" id="displayEpisodeNumber">Episode Number: {episode.episode.number}</li>
                <li className="list-group-item" id="displayEpisodeTitle">Title: {episode.episode.title}</li>
                <li className="list-group-item" id="displayDuration">Duration: {episode.episode.duration}</li>
            </ul>
        </div>
    )
})

export default EpisodeDisplay;