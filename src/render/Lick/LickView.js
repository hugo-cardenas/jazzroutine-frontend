import PropTypes from 'prop-types';
import React from 'react';
import { linkifier } from 'react-linkifier';
import TrackSectionView from './Track/TrackSectionView';

function LickView(props) {
    const { lick, editLick, deleteLick } = props;
    const { id, artist, description, tracks, tags } = lick;

    return (
        <div className="card lick lick-view">
            <div className="card-content">
                {renderArtist(artist)}
                {renderDescription(description)}
                <TrackSectionView tracks={tracks}/> 
                {renderTags(tags)}
            </div>
            {renderFooter(id, editLick, deleteLick)}
        </div>
    );
}

export default LickView;

function renderArtist(artist) {
    return <p className="artist">{artist}</p>;
}

function renderDescription(description) {
    // TODO Wrap long links
    return <pre className="description">
        {linkifier(description, {target: '_blank'})}
    </pre>;
}

function renderTags(tags) {
    // Render tags sorted alphabetically
    // tags.sort(); // TODO MOVE TO REDUX SELECTOR
    return <div className="tags">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>;
}

function renderFooter(id, editLick, deleteLick) {
    return <footer className="card-footer">
        <a className="card-footer-item lick-edit" onClick={() => editLick(id)}>
            <span className="icon is-small">
                <i className="fa fa-pencil-square-o"></i>
            </span>
        </a>
        <a className="card-footer-item lick-delete" onClick={() => deleteLick(id)}>
            <span className="icon is-small">
                <i className="fa fa-trash"></i>
            </span>
        </a>
    </footer>;
}

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
