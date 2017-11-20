import _ from 'lodash';

const artists = [
    [
        'Django Reinhardt',
        'Lady be good',
        ['https://upload.wikimedia.org/wikipedia/commons/f/f5/Django_Reinhardt_%28Gottlieb_07301%29.jpg', 30]
    ],
    [
        '', 
        'Blues clair', 
        ['https://upload.wikimedia.org/wikipedia/commons/f/f5/Django_Reinhardt_%28Gottlieb_07301%29.jpg', 30]
    ],
    [
        'Coleman Hawkins', 
        '', 
        ['https://rilm.files.wordpress.com/2014/11/coleman-hawkins.jpg', 25]
    ],
    [
        'Charlie Parker', 
        'Confirmation', 
        ['https://cps-static.rovicorp.com/3/JPG_400/MI0002/750/MI0002750232.jpg?partner=allrovi.com', 30]
    ],
    [
        'Dizzy Gillespie', 
        'A night in Tunisia', 
        ['http://mediad.publicbroadcasting.net/p/kuvo/files/styles/medium/public/201707/dizzy_gillespie.jpg', 35]
    ]
  ];

const tags = [
    'gypsy jazz',
    'bebop',
    'blues',
    'ii-V-I',
    'V-I',
    'altered scale',
    'diminished',
    'rhythm changes'
  ];

const url = "http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg";

export default function getDummyState(numItems) {
    const licks = _
        .range(numItems)
        .map(createItem);

    const state = {
        lick: {
            isCreateFormEnabled: false,
            items: licks.map(lick => { return { lick }; })
        }
    };

    // state.lick.items[0].mode = 'edit';
    return state;
}

const createItem = i => {
    const [artist, description, background] = artists[rand(0, artists.length - 1)];
    return {
        id: `${i + 1}`,
        artist,
        description,
        background,
        tracks: _.range(rand(1, 1)).map(createTrack),
        tags: _.uniq(_.range(rand(2, 2)).map(() => tags[rand(0, tags.length - 1)])),
        createdAt: i
    };
};

const createTrack = i => {
    return {
        // id: `${i}`,
        id: 'cj99x1nk90001uvc9y3mjpjne',
        url: url + `?a=${i}`
    };
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
