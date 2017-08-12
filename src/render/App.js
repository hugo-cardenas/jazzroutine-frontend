import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import Lick from './Lick/Lick';
import Search from './Search';
import PropTypes from 'prop-types';
import _ from 'lodash';

const renderLick = (lickState, deleteLick, saveLick, changeLickMode) => {
    return <Lick
        lick={lickState.lick}
        mode={lickState.mode}
        deleteLick={deleteLick}
        saveLick={saveLick}
        changeLickMode={changeLickMode}
        />;
};

const renderRow = (chunk, deleteLick, saveLick, changeLickMode) => {
    const chunkKey = chunk
        .map(lickState => lickState.lick.id)
        .join('-');
    return (
        <div key={chunkKey} className="columns">
            {chunk.map(lickState => {
              return <div 
                  key={lickState.lick.id} 
                  className="column is-one-third">
                      {renderLick(lickState, deleteLick, saveLick, changeLickMode)}
              </div>;
            })}
        </div>
    );
};

const App = (props) => {
    const {
        error,
        licks,
        deleteLick,
        saveLick,
        createLick,
        changeLickMode
    } = props;

    if (error instanceof Error) {
        alert('ERROR:' + "\n" + error);
    }

    const handleCreateLick = () => {
        window.scrollTo(0, 0);
        createLick();
    };

    const chunks = _.chunk(licks, 3);

    return (
        <div className="main-container">
                {renderTopContainer()}
                <div className="main-content">
                    {renderLickControls(handleCreateLick)}
                    <div className="lick-list">
                        {chunks.map(chunk => renderRow(chunk, deleteLick, saveLick, changeLickMode))}
                    </div>
                </div>
            </div>
    );
};

const renderTopContainer = () => {
    return <div className="top-container">
        <header className="main-header">
            <h5 className="subtitle is-5">Lickit</h5>
        </header>
    </div>;
};

const renderLickControls = (handleCreateLick) => {
    return <div className="lick-controls field is-grouped">
        <a className="button control lick-create" onClick={handleCreateLick}>
            <span className="icon">
                <i className="fa fa-plus-circle"></i>
            </span>
            <span>New lick</span>
        </a>
        <Search suggestions={getSuggestions()}/>
    </div>;
};

export default App;

App.propTypes = {
    error: PropTypes.object,
    licks: PropTypes.arrayOf(PropTypes.object).isRequired,
    createLick: PropTypes.func.isRequired,
    saveLick: PropTypes.func.isRequired,
    deleteLick: PropTypes.func.isRequired,
    changeLickMode: PropTypes.func.isRequired
};


// TODO Test

const getSuggestions = () => {
    return [
        {
            title: 'Artist',
            suggestions: [
                'Charlie Parker',
                'Dizzy Gillespie',
                'Django Reinhardt',
                ..._.range(0, 5).map(i => 'artist' + i)
            ]
        },
        {
            title: 'Tag',
            suggestions: [
                'christoph changes',
                'bebop',
                'blues',
                'gypsy jazz',
                'rhythm changes',
                ..._.range(0, 10).map(i => 'tag' + i)
            ]
        }
    ];
};
