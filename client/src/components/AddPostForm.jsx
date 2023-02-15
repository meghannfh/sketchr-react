import { useState } from 'react'
import axios from 'axios'
//dotenv files names in react need to start with REACT_APP_
const preset = process.env.REACT_APP_CLOUDINARY_PRESET
const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
axios.defaults.baseURL = 'http://127.0.0.1:8002'

const AddPostForm = () => {
  const [cloudinaryUrl, setCloudinaryUrl] = useState('')
  const [postData, setPostData] = useState(
    {
      prompt: "",
      media: "",
      size: "",
      canvas: "",
      image: "",
      description: ""
    }
  )

  console.log(postData)
  const handleOnChange = (e) => {
    const {name, value, type } = e.target
    
    setPostData(prevPostData => {
      return {
        ...prevPostData,
        [name]: value
      }
    })
  }

/*file input is touchy and thinks that she's special
  I have to give her her own function to set the image file path*/
  // const handleImageUrl = e => {
  //   e.preventDefault()
  //   //dunno why this needs an idx of 0 but apparently it's standard practice.
  //   setImage(e.target.files[0])
  //   }

  /*so now I need to handle uploading the image file we got from
  handleImgUrl to cloudinary and getting whatever it is back
  and THEN add that to the body of my post*/
  // const handleSomething = async (e) => {
  //   e.preventDefault()
  //   //check if there's even a value in image
  //   if(!image) {
  //       setError("Please select a file!")
  //   } else {
  //     /*idk in what situations new FormData() is necessary 
  //     but apparently uploading to cloudinary is one*/
  //     const formData = new FormData() //if you don't capitalize Form in FormData() here you'll get an error
  //     formData.append('file', image);
  //     formData.append('upload_preset', preset)
  //     console.log(formData)
  //     try{
  //     /*you need to grab the upload endpoint from cloudinary
  //     by default, the cloudinary API endpoints use this format:
  //     https://api.cloudinary.com/v1_1/:cloud_name/:action
  //     POST request example: https://api.cloudinary.com/v1_1/demo/image/upload
  //     your cloud name is on the dashboard of your cloudinary acct*/
  //     const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
  //     //when using axios you don't need to declare the method again

  //     //now we get the data back from cloudinary and always gotta add .data and then append the
  //     //.secure_url to get the correct cloudinary URL and we set that info as new cloudinaryUrl value
  //     // setCloudinaryUrl(res.data.secure_url)
  //     setCloudinaryUrl(res.data.secure_url)
  //     handleAddPost()
  //     }catch(err){
  //       console.error(err)
  //     }
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

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
        <div>
            <form>
                <div>
                  <label htmlFor="name">prompt</label>
                  <input 
                    type="text" 
                    onChange={handleOnChange}
                    value={postData.prompt}
                    name="prompt"  
                    placeholder="prompt" 
                  />
                </div>
                
                <div>
                  <label htmlFor="media">media</label>
                  <div>
                    <select 
                      name="media"
                      onChange={handleOnChange}
                      value={postData.media}
                      >
                        {mediaList.map((medium, idx) => (
                          <option key={idx} value={medium}>{medium}</option>
                        ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="size">size</label>
                  <div>
                    <select 
                      name="size"
                      onChange={handleOnChange}
                      value={postData.size}
                      >
                        {sizesList.map((size, idx) => (
                          <option key={idx} value={size}>{size}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="canvas">canvas</label>
                  <div>
                    <select
                      name="canvas"
                      onChange={handleOnChange}
                      value={postData.canvas}
                      >
                      {canvasList.map((canvas, idx) => (
                        <option key={idx} value={canvas}>{canvas}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description">description</label>
                  <textarea
                    type="textarea"
                    name="description"
                    onChange={handleOnChange}
                    value={postData.description}
                    ></textarea>
                </div>

                <div>
                  <label htmlFor="image">upload image</label>
                  <input 
                    type="file" 
                    onChange={handleOnChange}
                    name='image'
                    value={postData.image}
                    />
                </div>

                <button>submit</button>
            </form>
            {/* {error && <div>{error}</div>} */}
        </div>
    )
}

export default AddPostForm