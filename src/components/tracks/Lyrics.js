import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment'

// Sets the moment instance to use.
Moment.globalMoment = moment;
 
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'th';
 
// Set the output format for every react-moment instance.
Moment.globalFormat = 'Do MMMM YYYY';
 
// Use a <span> tag for every react-moment instance.
Moment.globalElement = 'span';
 
// Upper case all rendered dates.
Moment.globalFilter = (d) => {
    return d.toUpperCase();
};
 

const CheckGenre_List =(props)=>{
    const genreList = props.genreList
    console.log(Object.keys(genreList))
    console.warn(genreList)
    if(genreList.length===0){
        return "N/A"
    }else{
        return genreList[0].music_genre.music_genre_name

    }
}

class Lyrics extends Component {
    state={
        track:{},
        lyrics:{}
    }

componentDidMount(){
      const cors_anywhere = `https://cors-anywhere.herokuapp.com/`;
        axios
        .get(`${cors_anywhere}http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${
            process.env.REACT_APP_MM_KEY}
        `)
        .then(res=>{
            // console.log(res.data.message);
            this.setState({lyrics:res.data.message.body.lyrics})
        })
        .then(()=>{
            return axios.get(`${cors_anywhere}http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${
                process.env.REACT_APP_MM_KEY}
            `)  
        })
        .then(res=>{
            this.setState({track:res.data.message.body.track})
    //   console.log(res.data.message.body.track.primary_genres.music_genre_list.length)

        })
        .catch(err=>console.error(err))
}




  render() {
      const {track,lyrics}  = this.state;
   if(track === undefined || lyrics === undefined || Object.keys(track).length ===0 || Object.keys(lyrics).length ===0){
    return <Spinner/>
   }else{
    return (
        <React.Fragment>
            <Link to='/' className='btn btn-dark btn-sm mb-4'>กลับสู่หน้าหลัก</Link>
            <div className="card">
                <h5 className="card-header">
                     {track.track_name} โดย <span className="text-secondary">{track.artist_name}</span>
                </h5>
                <div className="card-body">
                    <p className="card-text">{lyrics.lyrics_body}</p>
                </div>   
            </div>  
            
            <ul className="lsit-group mt-3">
                <li className="list-group-item">
                    <strong>วันที่ปล่อยเพลง </strong> : 
                    <Moment>
                     {track.first_release_date}
                    </Moment>
                </li>
                <li className="list-group-item">
                    <strong>ประเภท</strong> : <CheckGenre_List genreList={track.primary_genres.music_genre_list}/>
                </li>
                <li className="list-group-item">
                <strong>Explicit Words</strong> : {track.explicit===0?'No':'Yes'}
                </li>
               
            </ul>
          
        </React.Fragment>
    )}


  }
}

export default Lyrics


