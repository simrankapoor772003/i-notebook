import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context=useContext(NoteContext)
    const {deletenote}=context
    const {note,updatenote}=props
    
  return (
    <div className='col-md-3'>
      <div className="card my-2">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
        </div>
        <div className="d-flex">
        <i className="fa-solid fa-trash my-2 mx-2" onClick={()=>{deletenote(note._id);props.showAlert("A note has been deleted!!","info")}}></i>
        <i className="fa-solid fa-pen-to-square my-2 mx-2"onClick={()=>updatenote(note)}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
