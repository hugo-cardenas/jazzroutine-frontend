import { createLick, updateLick, deleteLick, changeLickMode } from './state/actions/lick';
import { getUrlResolver } from './track/urlResolver';

const mapStateToProps = (state) => {
    return {
        error: state.error,
        items: state.items.map(mapLickStateToProps),
        search: get
    };
};

const mapLickStateToProps = (lickState) => {
    const lick = lickState.lick;
    return {
        mode: lickState.mode ? lickState.mode : undefined,
        lick: {
            id: lick.id,
            artist: lick.artist,
            description: lick.description,
            tags: [...lick.tags], // TODO Fix in a better way this reference problem - state modified as react state
            tracks: lick.tracks.map(track => {
                return {
                    ...track,
                    // Calculate track urls to filesystem from their id
                    url: 'file://' + getUrlResolver()(track.id)
                };
            })
        }
    };
};

const mapSearchStateToProps = (searchState) => {

};

const getSuggestions = () => {

};

const getArtists = () => {

};

const getTags = () => {

};

const mapDispatchToProps = (dispatch) => {
    return {
        createLick: () => dispatch(createLick()),
        saveLick: (lick) => dispatch(updateLick(lick)),
        deleteLick: (id) => dispatch(deleteLick(id)),
        changeLickMode: (id, mode) => dispatch(changeLickMode(id, mode))
    };
};

export { mapStateToProps, mapDispatchToProps };
