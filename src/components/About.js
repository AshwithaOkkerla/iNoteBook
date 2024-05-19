import React from 'react'
import { useContext,useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
	const a = useContext(NoteContext)
	useEffect(()=>{
		a.update()
	},[])
  return (
	<div>
	This is About {a.state.name} and she is in class {a.state.class}
	</div>
  )
}

export default About
