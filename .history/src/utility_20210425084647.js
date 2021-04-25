import React from 'react'
import {Howl, Howler} from 'react-howler'
import Audio1 from "./audiofiles/fail-trombone-03.mp3"

class soundplay extends React.Component() {
    SoundPlay = (src) => {
        const sound = new Howl({
       src
        })
        sound.play();
    }
 render(){
     return(
         <div></div>
     )
 }
}
export default soundplay;