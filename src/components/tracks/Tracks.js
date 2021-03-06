import React, { Component } from 'react'
import {Consumer} from '../../context'
import Spinner from '../layout/Spinner'
import Track from '../tracks/Track'
 class Tracks extends Component {
  render() {
    return (
     <Consumer>
         {(value)=>{
           const {track_list,heading,notFound} = value
          if(track_list===undefined || track_list.length ===0 && !notFound){
            return <Spinner/>
          }else if(notFound){
            return (
            <React.Fragment>
              <h3>ไม่พบเพลงที่ค้นหา...</h3>
            </React.Fragment>
            )
          }else{
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
              <div className="row ">
                {track_list.map(item=><Track key={item.track.track_id} track={item.track}/>)}
              </div>
              </React.Fragment>
         
            )
          }
         }}
     </Consumer>
    )
  }
}

export default Tracks;
