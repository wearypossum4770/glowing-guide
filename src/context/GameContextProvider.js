import {useReducer} from 'react'

const initialState = {
    isStarted: false,
isConnected: false,
isJudge: false,
judge: "",
question: "",
deck: [],
showEndScreen: false,
scoreboard: [],
}
function gameReducer(state,action){
    let {payload} = action
    switch(action.type){
        default:
            return {...state}
case "START":
    return {...state, isStarted:payload,}
case "CONNECT":
    return {...state,isConnected:payload }
case "JUDGE":
    return {...state,isJudge:payload }
case "GET_QUESTION":
    return {...state,question:payload }
case "SET_DECK":
    return {...state, deck:[...deck, payload]}
case "END":
    return {...state, showEndScreen:payload}
case "SET_SCORE":
    return {...state,scoreboard:[...scoreboard, payload]}
    }
}
const GameContextProvider = ({ children }) => {
const [state, dispatch] = useState(gameReducer, initialState)
  }