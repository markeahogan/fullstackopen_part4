const Blog = require('../models/Blog')

const initialBlogs = [
    {
        title:"Title1",
        author:"Author1",
        url:"Url1",
        likes:1
    },
    {
        title:"Title2",
        author:"Author2",
        url:"Url2",
        likes:2
    }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, notesInDb
}