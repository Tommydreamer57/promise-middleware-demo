import axios from 'axios';

// initialState contains our expected data structure for our app, with all the expected properties and data types
const initialState = {
    // users will be an array of objects
    users: [
        {
            // each object will have properties 'name' and 'id'
            name: "", // name will be a string
            id: -1 // id will be a number
        }
    ]
}

// redux-promise-middleware adds _PENDING and _FULFILLED or _REJECTED to the action.type when the action.payload is a Promise
// MAKE SURE YOU SPELL THESE CORRECTLY
// _PENDING is added to the action.type when the action.payload is first returned
const PENDING = '_PENDING';
// _FULFILLED is added to the action.type when the action.payload Promise is resolved
const FULFILLED = '_FULFILLED';
// _REJECTED is added to the action.type when the action.payload Promise is rejected
const REJECTED = '_REJECTED';


// assign action.type's to variables for the sake of debugging
const GET_USERS = 'GET_USERS'

// action creators are exported to our components so that our components can access them
export function getUsers() {
    // users will be our promise object requesting data from an api
    let users = axios.get('http://45.55.132.212:3001/api/admin/users').then(response => response.data)
    console.log(users)
    // always return an object with properties 'type' and 'payload'
    return {
        type: GET_USERS,
        payload: users
    }
}

// the reducer is the default export accessed in the store
// state defaults to the initialState defined above, when redux initializes
export default function reducer(state = initialState, action) {
    // console.log the action.type and action.payload during development to see redux work in the console
    console.log(action.type)
    console.log(action.payload)
    // the reducer is a giant switch statement, checking for the action.type's in order to update the correct properties of state
    switch (action.type) {
        // redux-promise-middleware will add _PENDING to GET_USERS when the request is initially made
        case GET_USERS + PENDING:
            // here we can do something while we wait for a response
            return state
        // redux-promise-middleware will add _FULFILLED to GET_USERS when the response has been received
        case GET_USERS + FULFILLED:
            let users = action.payload
            // here we take the users array from the action.payload and combine it with our previous state
            // Object.assign({}) takes all the objects we give to it and combines them into one
            // this is the line that creates the new state of our app
            return Object.assign({}, state, { users })
        // redux-promise-middleware will add _REJECTED if our request is rejected
        case GET_USERS + REJECTED:
            // here we can do something to show that our request was denied
            return state
        // all switch statements should generally have a default case
        default:
            // here we will just return the original state to prevent our app from breaking    
            return state
    }
}
