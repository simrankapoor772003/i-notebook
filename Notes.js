import React, { useEffect, useRef } from 'react'
import { useContext ,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { Navigate, useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context=useContext(NoteContext)
    const {notes,getNotes,addnote,editnote}=context
    let Navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('token')) getNotes();
      else Navigate('/login')
    },[])
    const [note,setnote]=useState({id:"",etitle:"",edescription:"",etag:"default"})
    const ref=useRef(null)
    const ref2=useRef()
    const updatenote=(currentnote)=>{
      ref.current.click();
      setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }
    const handlechange=(e)=>{
      setnote({...note,[e.target.name]:e.target.value})
    }
    const handleclick =(e)=>{
        e.preventDefault();
        editnote(note.id,note.etitle,note.edescription,note.etag)
        ref2.current.click();
        props.showAlert("The note has been updated!!","info")
    }
  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form className='container'>
              <div className="my-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={handlechange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={handlechange}/>
              </div>
              <div className="mb-3"> 
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handlechange}/>
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button ref={ref2} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
          <div className="row my-4">
          {notes.map((note)=>{
            return <NoteItem key={note._id} updatenote={updatenote} note={note} showAlert={props.showAlert}/>;
          })}
        </div>
      </div>
    </div>
  )
}

export default Notes
