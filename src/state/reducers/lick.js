import VError from 'verror';
import Joi from 'joi-browser';
import {
    LICK_CREATE,
    LICK_UPDATE,
    LICK_DELETE
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case LICK_CREATE:
            return createLick(state);
        case LICK_UPDATE:
            return updateLick(state, action.lick);
        case LICK_DELETE:
            return deleteLick(state, action.id);
        default:
            return state;
    }
};

function createLick(state) {
    return [
        {
            lick: {
                // TODO Add field createdAt
                // TODO Refactor this hack, generate ids in a proper way
                id: state.length ? Math.max(...state.map(lickState => lickState.lick.id)) + 1 : 1,
                description: '',
                tracks: [],
                tags: []
            },
            mode: 'edit'
        },
        ...state
    ];
}

function updateLick(state, lick) {
    try {
        validateLick(lick);
        var index = findLickIndex(state, lick.id);
    } catch (error) {
        throw new VError(error, 'Unable to reduce %s with lick %s', LICK_UPDATE, JSON.stringify(lick));
    }
    const newState = [...state];
    newState[index] = {...state[index], lick};
    return newState;
}

function deleteLick(state, id) {
    try {
        var index = findLickIndex(state, id);
    } catch (error) {
        throw new VError(error, 'Unable to reduce %s with id %s', LICK_DELETE, id);
    }
    const newState = [...state];
    newState.splice(index, 1)
    return newState;
}

function validateLick(lick) {
    const schema = Joi.object().keys({    
        id: Joi.number().min(1).required(),
        description: Joi.string().allow('').required(),
        tracks: Joi.array().required(),     // TODO Validate nested track objects
        tags: Joi.array().items(Joi.string()).required()
    });

    const {error} = Joi.validate(lick, schema, {abortEarly: false, convert: false});
    if (error) {
        throw error;
    }
}

function findLickIndex(state, id) {
    const index = state.findIndex(lickState => lickState.lick.id === id);
    if (index < 0) {
        throw new VError('Id %s not found', id);
    }
    return index;
}
