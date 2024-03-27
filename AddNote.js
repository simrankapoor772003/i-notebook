import {React,useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context=useContext(NoteContext)
    const {addnote}=context
    const [note,setnote]=useState({title:"",description:"",tag:"default"})
    const handleclick =(e)=>{
      e.preventDefault();
      addnote(note.title,note.description,note.tag)
      setnote({title:"",description:"",tag:""})
      props.showAlert("A new note has been added!!","info")
    }
    const handlechange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h1 className='App' style={{marginTop:"55px"}}>Add a Note</h1>
      <form className='container'>
        <div className="my-3">
          <label for="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={note.title}  id="title" name='title' onChange={handlechange}/>
        </div>
        <div className="mb-3">
          <label for="description" className="form-label">Description</label>
          <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={handlechange}/>
        </div>
        <div className="mb-3"> 
          <label for="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={handlechange}/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5}type="submit" className="btn btn-primary"onClick={handleclick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
