import React, { Component } from 'react'
import axios from 'axios'
import {consumer, Consumer} from '../../context'
import Spinner from '../layout/Spinner'

 class Search extends Component {

    state = {
        trackTitle : ''
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value //trackTitle
        })
    }

    findTrack=(dispatch,e)=>{
        e.preventDefault();
        dispatch({type: 'CLEAR_TRACKS'}) 
        const cors_anywhere = `https://cors-anywhere.herokuapp.com/`;
        axios.get(`${cors_anywhere}http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
            process.env.REACT_APP_MM_KEY}
        `)
        .then(res=>{
            if(res.data.message.body.track_list.length===0){
                console.log('0')
                dispatch({type: 'NOT_FOUND',payload:true}) 
            }else{
            dispatch({
                type: 'SEARCH_TRACKS',
                payload : res.data.message.body.track_list,

            })
        }

            this.setState({trackTitle:''})

        })
        .catch(err=>console.error(err))
    }


  render() {
    return (
      <Consumer>
        {value=>{
            const {dispatch} = value;
            return(
                <div className="card card-body mb-4 p-4">
                    <h1 className="display-4 text-center">
                        <i className="fas fa-music"></i> ค้นหาเพลง 
                    </h1>
                    <p className="lead text-center">ค้นหาเนื้อเพลง</p>
                    <form onSubmit={this.findTrack.bind(this,dispatch)}>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="ชื่อเพลง"
                            name="trackTitle"
                            value={this.state.trackTitle}
                            onChange={this.onChange}
                            />
                        </div>
                        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                        ค้นหาเพลง
                        </button>
                        
                    </form>
                </div>
            )
            
        }}
      </Consumer>
    )
  }
}

export default Search;
