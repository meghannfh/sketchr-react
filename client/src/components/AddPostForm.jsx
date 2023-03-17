import { useState, useRef } from 'react'
import axios from 'axios'
//dotenv files names in react need to start with REACT_APP_
const preset = process.env.REACT_APP_CLOUDINARY_PRESET
const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
axios.defaults.baseURL = 'http://127.0.0.1:8002'

const AddPostForm = () => {
  //set reference to form element
  const [file, setFile] = useState('')
  const [error, setError] = useState(null)
  const formRef = useRef()

  /*file input is touchy and thinks that she's special
 so I'm handling it on its own and then adding it to my postData*/
  const handleOnChange = e => {
    e.preventDefault()
    //grab the file as soon as the user selects it
    setFile(e.target.files[0]);
  }

  /*This will run as soon as the user hits submit
  passing in the file saved in file's state*/
  const handleCloudinaryUrl = async (file) => {
    if(!file){
      setError("Please select a file!") 
    }

    /*idk in what situations new FormData() is necessary 
    but apparently uploading to cloudinary is one*/
      const formData = new FormData() //if you don't capitalize Form in FormData() here you'll get an error
      formData.append('file', file);
      formData.append('upload_preset', preset)
      try {
        /*you need to grab the upload endpoint from cloudinary
        by default, the cloudinary API endpoints use this format: 
        https://api.cloudinary.com/v1_1/:cloud_name/:action 
        POST request example: https://api.cloudinary.com/v1_1/demo/image/upload
        your cloud name is on the dashboard of your cloudinary acct*/
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        return res.data.secure_url//need to append .secure_url
      }catch(err){
        console.error(err)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault() //idk if I need this. I actually want the page to immediate refresh with the new data
    try {
      const cloudinaryUrl = await handleCloudinaryUrl(file) //wait for cloudinary to return the generated url
      const formData = new FormData(formRef.current)//grab the form data using useRef
      const body = {} //we're going to organize our formdata into body and return that
      formData.forEach((value, key) => {
        if(key === "image"){
          body[key] = cloudinaryUrl // setting the cloudinaryURL for image
        } else {
          body[key] = value
        }
      }, {})

      const res = await axios.post('/post/addPost', body)//send our curated body
      console.log(body)
      console.log(res.data)
    }catch (err){
      console.error(err)
    }
    

    // formData.append("prompt", formRef.current.elements.prompt.value)
    // formData.append("image", formRef.current.elements.image.files[0])

    // console.dir(formRef.current.elements.image)

    // for(const pair of formData.entries()){
    //   console.log(pair[0])
    //   console.log(pair[1])
    // }

    // axios.post('/post/addPost', body)
    // .then(response => {
    //   console.log(response)        
    // }).catch(error => {
    //    console.log("this is error", error);
    // });
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
        <div className="p-6 border-4 bg-orange-200 border-orange-200 w-96 rounded-lg">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data">
                <div className="form-layout">
                <label htmlFor="prompt">title</label>
                  <input 
                    type="text" 
                   
                    name="prompt"  
                    placeholder="title..." 
                  />
                </div>
                
                <div className="form-layout">
                  <label htmlFor="media">media</label>
                  <div>
                    <select 
                      name="media"
                   
                   
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
                    placeholder='Tell us about this piece.'
                    ></textarea>
                </div>

                <div className="form-layout">
                  <input 
                    type="file" 
                    name="image"
                    onChange={handleOnChange}
              
                    />
                </div>

                <button className='transition-color bg-yellow-600 hover:bg-orange-500 p-2 rounded-md font-bold uppercase text-white'>submit</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    )
}

export default AddPostForm