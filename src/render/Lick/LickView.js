import PropTypes from 'prop-types';
import React from 'react';
import { linkifier } from 'react-linkifier';
import Player from '../Audio/Player';

const LickView = (props) => {
    const { lick, editLick, deleteLick } = props;
    const { id, artist, description, tracks, tags } = lick;

    // linear-gradient(rgba(222, 222, 222, 0.45), rgba(222, 222, 222, 0.45))

    return <div className="card lick lick-view">
        <div className="card-content">
            {renderMenu(id, editLick, deleteLick)}
            {renderArtist(artist)}
            {renderDescription(description)}
            <div id="track-container">
                <div className="center">
                    <Player src={tracks[0].url}/>
                </div>
            </div>
            {renderTags(tags)}                
        </div>
    </div>;
};

const renderMenu = (id, editLick, deleteLick) => {
    return <div className="dropdown is-right is-hoverable is-pulled-right">
        <div className="dropdown-trigger">
            <span className="icon is-small" aria-haspopup="true" aria-controls="dropdown-menu">
                <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
                <a className="dropdown-item" onClick={() => editLick(id)}>
                    <span className="icon is-small">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                    <span>Edit</span>
                </a>
                <a className="dropdown-item" onClick={() => deleteLick(id)}>
                    <span className="icon is-small">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </span>
                    <span>Delete</span>
                </a>
            </div>
        </div>
    </div>;
};

const renderArtist = artist => 
    <p className="artist">{artist}</p>;

const renderDescription = description => 
    <pre className="description">
        {linkifier(description, {target: '_blank'})} | <a href="#">Link</a>
    </pre>;

const renderTags = tags =>
    <div className="tags">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>;

export default LickView;

LickView.propTypes = {
    lick: PropTypes.shape({
        id: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    editLick: PropTypes.func.isRequired,
    deleteLick: PropTypes.func.isRequired
};
