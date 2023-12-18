import { useRef } from 'react';

//need to bring in the specific text from 
//the clicked post so need to grab id and need it to pre populate input fields with the old data
const EditPostForm = () => {
  
  const formRef = useRef()

  const handleEditPost = async (e) => {
    e.preventDefault()
  }
    return(
      <div className="p-6 border border-pink-400 w-auto mx-2 xsm:mx-0 xsm:w-96 rounded-lg bg-white">
        <form className="flex flex-col gap-2" onSubmit={handleEditPost} ref={formRef}>
          <div className="form-layout">
            <label htmlFor="prompt">title</label>
            <input 
              type="text" 
              name="title"
              className={(emptyFields && emptyFields.includes('title')) ? 'error' : ''}  
              placeholder="title..." 
            />
          </div>
        
          <div className="form-layout">
            <label htmlFor="description">description</label>
            <textarea
              type="textarea"
              name="description"
              className={(emptyFields && emptyFields.includes('description')) ? 'error' : ''}
              placeholder='Tell us about this piece.'
              ></textarea>
          </div>

          <div className="flex flex-row gap-2">
            <button className='grow form-btns transition-colors ease-in-out' type="submit">submit</button>
            <button className='grow form-btns transition-colors ease-in-out' type="button">cancel</button>
          </div>
        </form>
        {error && <div className='border-2 border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
    )
}

export default EditPostForm