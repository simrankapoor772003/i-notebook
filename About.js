import React, { useContext } from 'react'
import { useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
const About = () => {
    // const a=useContext(NoteContext)
    // useEffect(()=>{
    //     a.update();
    //     //eslint-disable-next-line
    // },[])
    return (
        <div>
        This is about
        {/* This is about {a.state.name} which is in class {a.state.class} */}
        </div>
    )
}

export default About
