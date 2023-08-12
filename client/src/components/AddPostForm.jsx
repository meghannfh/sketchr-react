import { useState, useRef } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8002'

const AddPostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${user && user.token}` 
   }
  }
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  //set reference to form element
  const formRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmptyFields([]);
    const formData = new FormData(formRef.current)//grab the form data using useRef

    if(user){
      try {
        const res = await axios.post('/post/addPost', formData, headerConfig)

        console.log(res.data)

        dispatch({type: 'CREATE_POST', payload: res.data})

        //reset the input fields
        formRef.current.reset();
      }catch (err){
        setEmptyFields(err.response.data.emptyFields)
        setError(err.response.data.err)
      }
    
    }
  }

    const mediaList = [
      'graphite',
      'ballpoint pen',
      'brush pen',
      'marker',
      'colored pencils',
      'brush markers',
      'paint markers',
      'watercolor',
      'acrylic',
      'mixed media',
      'photoshop',
      'procreate',
      'clip studio',
      'other'
    ]

    const sizesList = [
      '2" x 2" sticker',
      '4" x 6" postcard',
      '5" x 7" postcard',
      '6.9" x 9.8" B5',
      '8.27" x 11.69" A4',
      '8.5" x 11" letter',
      '8.5" x 14" legal',
      '9.8" x 13.9" B4',
      '11" x 17" tabloid',
      'other'
    ]

    const canvasList = [
      'sketchbook paper',
      'marker paper',
      'canvas',
      'watercolor hard press',
      'watercolor cold press',
      'bristol',
      'charcoal paper',
      'iPad',
      'digital tablet',
      'other'
    ]

    return(
      <div className="p-6 border-2 border-pink-400 w-96 rounded-lg bg-white">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef}>
          <div className="form-layout">
            <label htmlFor="prompt">title</label>
            <input 
              type="text" 
              name="prompt"
              className={emptyFields && emptyFields.includes('title') ? 'error' : 'border-2'}  
              placeholder="title..." 
            />
          </div>
            
          <div className="form-layout">
            <label htmlFor="media">media</label>
            <div>
              <select 
                name="media"
                className='border-2'
                >
                {mediaList.map((medium, idx) => (
                  <option key={idx} value={medium}>{medium}</option>
                ))}
              </select>
            </div>
          </div>
            
          <div className="form-layout">
            <label htmlFor="size">size</label>
            <div>
              <select
                className='border-2'
                name="size"
                >
                {sizesList.map((size, idx) => (
                  <option key={idx} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-layout">
            <label htmlFor="canvas">canvas</label>
            <div>
              <select
                className="border-2"
                name="canvas"
                >
                {canvasList.map((canvas, idx) => (
                  <option key={idx} value={canvas}>{canvas}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-layout">
            <label htmlFor="description">description</label>
            <textarea
              type="textarea"
              name="description"
              className={emptyFields && emptyFields.includes('description') ? 'error' : 'border-2'}
              placeholder='Tell us about this piece.'
              ></textarea>
          </div>
          <div className="form-layout">
            <input 
              type="file" 
              name="file"
              className={emptyFields && emptyFields.includes('file') ? 'error' : 'border-2'}
              />
          </div>
          <button className='transition-color ease-in-out border-2 p-2 rounded-md font-bold uppercase hover:outline-none'>submit</button>
        </form>
        {error && <div className='border-2 border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
    )
}

export default AddPostForm