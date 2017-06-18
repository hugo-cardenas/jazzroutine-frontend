import _ from 'lodash';
import VError from 'verror';
import lickReducer from 'src/state/reducers/lick';
import {createLick, updateLick, deleteLick} from 'src/state/actions/lick';
import {
    LICK_CREATE,
    LICK_UPDATE,
    LICK_DELETE
} from 'src/state/actions/types';

it('define default state', () => {
    const expectedState = [];

    expect(lickReducer(undefined, {type: 'invalid action'})).toEqual(expectedState);
})

it('reduce unknown action', () => {
    const state = Object.freeze([]);
    const expectedState = [];

    expect(lickReducer(state, {type: 'invalid action'})).toEqual(expectedState);
});

it('create lick', () => {
    const state = Object.freeze([{lick: {id: 10}}]);
    const expectedState = [
        {
            lick: {
                    description: '',
                    tracks: [],
                    tags: []
                },
            mode: 'edit'
        },
        {lick: {id: 10}}
    ];

    const newState = lickReducer(state, createLick());
    expect(newState).toHaveLength(2);
    
    expect(newState[0].mode).toBe('edit');
    expect(newState[0].lick.id).toBeGreaterThan(0);
    expect(newState[0].lick.id).not.toBe(10);
    expect(newState[0].lick.description).toBe('');
    expect(newState[0].lick.tracks).toEqual([]);
    expect(newState[0].lick.tags).toEqual([]);

    expect(newState[1]).toEqual({lick: {id: 10}});
});

const validLicks = [
    {
        id: 20,
        description: 'bar baz',
        tracks: [{id: 200}],
        tags: ['foo', 'baz']
    },
    {
        id: 20,
        description: '',
        tracks: [{id: 200}],
        tags: ['foo', 'baz']
    },
    {
        id: 20,
        description: 'bar baz',
        tracks: [],
        tags: ['foo', 'baz']
    },
    {
        id: 20,
        description: 'bar baz',
        tracks: [{id: 200}],
        tags: []
    }
];

validLicks.forEach((lick, i) => {
    it('update lick, success #' + i, () => {
        const state = Object.freeze([
            {lick: {id: 10}},
            {
                lick: {
                    id: 20,
                    description: 'foo',
                    tracks: [{id: 100}, {id: 200}],
                    tags: ['foo', 'bar']
                },
                mode: 'edit'
            }, 
            {lick: {id: 30}}
        ]);

        const expectedState = [
            {lick: {id: 10}},
            {lick: lick, mode: 'view'},
            {lick: {id: 30}}
        ];

        expect(lickReducer(state, updateLick(lick))).toEqual(expectedState);
    });
})

const validLick = {
    id: 20,
    description: 'bar baz',
    tracks: [{id: 200}],
    tags: ['foo', 'baz']
};

const invalidLicks = [   
    // Missing fields
    [_.pick(validLick, ['description', 'tracks', 'tags']), ['id']],
    [_.pick(validLick, ['id', 'tracks', 'tags']), ['description']],
    [_.pick(validLick, ['id', 'description', 'tags']), ['tracks']],
    [_.pick(validLick, ['id', 'description', 'tracks']), ['tags']],
    [_.pick(validLick, ['id', 'tracks']), ['description', 'tags']],
    
    // Invalid values
    [Object.assign({}, validLick, {id: 'foo'}), ['id']],
    [Object.assign({}, validLick, {id: -1}), ['id']],

    [Object.assign({}, validLick, {description: 42}), ['description']],

    [Object.assign({}, validLick, {tracks: 42}), ['tracks']],
    // [Object.assign({}, validLick, {tracks: [{id: 200}, 'foo']}), ['tracks']], // TODO ENABLE

    [Object.assign({}, validLick, {tags: 42}), ['tags']],
    [Object.assign({}, validLick, {tags: ['foo', 42]}), ['tags']]
];

invalidLicks.forEach((entry, i) => {
    it('update lick, invalid data #' +i, () => {
        const [lick, invalidProperties] = entry;    
        const state = Object.freeze([
            {id: 10},
            {id: 20}, 
            {id: 30}
        ]);

        try {
            lickReducer(state, updateLick(lick));
            throw new Error();
        } catch (error) {
            expect(error.message).toEqual(expect.stringContaining('Unable to reduce ' + LICK_UPDATE));
            expect(error.message).toEqual(expect.stringContaining(JSON.stringify(lick)));
            invalidProperties.forEach(property => {
                expect(VError.cause(error).message).toEqual(expect.stringContaining(property));
            })
        }
    });
});

it('update lick, id not found', () => {
    const state = Object.freeze([
        {lick: {id: 10}},
        {lick: {id: 30}}
    ]);

    const lick = {
        id: 20,
        description: 'bar baz',
        tracks: [{id: 200}],
        tags: ['foo', 'baz']
    };

    try {
        lickReducer(state, updateLick(lick));
        throw new Error();
    } catch (error) {
        expect(error.message).toEqual(expect.stringContaining('Unable to reduce ' + LICK_UPDATE));
        expect(error.message).toEqual(expect.stringContaining(JSON.stringify(lick)));
        expect(error.message).toEqual(expect.stringContaining('Id 20 not found'));
    }
});

it('delete lick, success', () => {
    const state = Object.freeze([
        {lick: {id: 10}},
        {lick: {id: 20}}, 
        {lick: {id: 30}}
    ]);

    const expectedState = Object.freeze([
        {lick: {id: 10}},
        {lick: {id: 30}}
    ]);

    expect(lickReducer(state, deleteLick(20))).toEqual(expectedState);
});

it('delete lick, id not found', () => {
    const state = Object.freeze([
        {lick: {id: 10}},
        {lick: {id: 20}}, 
        {lick: {id: 30}}
    ]);

    try {
        lickReducer(state, deleteLick(999));
        throw new Error();
    } catch (error) {
        expect(error.message).toEqual(expect.stringContaining('Unable to reduce ' + LICK_DELETE));
        expect(error.message).toEqual(expect.stringContaining('Id 999 not found'));
    }
});
