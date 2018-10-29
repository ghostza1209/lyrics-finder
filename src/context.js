import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state,action) =>{
    switch(action.type){
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list:action.payload,
                heading: 'ผลการค้นหา'
            }
        case 'CLEAR_TRACKS':
             return {...state,track_list:''}
        case 'NOT_FOUND':
             return {...state,track_list:'',notFound:action.payload}
        default :
            return state;
    }
}



export class Provider extends Component {

    state = {
        track_list:[],
        heading:'เพลง ฮิต!!!',
        dispatch: action=>this.setState(state=>reducer(state,action)),
        notFound:false
    }

    componentDidMount(){
        const cors_anywhere = `https://cors-anywhere.herokuapp.com/`;
        axios.get(`${cors_anywhere}http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=th&f_has_lyrics=1&apikey=${
            process.env.REACT_APP_MM_KEY}
        `)
        .then(res=>{
            this.setState({
                track_list:res.data.message.body.track_list
            })
        })
        .catch(err=>console.error(err))
    }

  render() {
    return (
     <Context.Provider value={this.state}>
        {this.props.children}
     </Context.Provider>
    )
  }
}


export const Consumer = Context.Consumer