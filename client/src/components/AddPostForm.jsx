import { useState, useEffect } from 'react'
import axios from 'axios'
//dotenv files names in react need to start with REACT_APP_
const preset = process.env.REACT_APP_CLOUDINARY_PRESET
const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME

const AddPostForm = () => {
  const [prompt, setPrompt] = useState('')
  const [media, setMedia] = useState('')
  const [size, setSize] = useState('')
  const [canvas, setCanvas] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)

  //so file input is touchy and needs to be handled with care
  //I have to give her her own onChange function to set the image file path
  const handleImageUrl = e => {
    e.preventDefault()
    //dunno why this needs an idx of 0 but apparently it's standard practice.
    //whateva
    setImage(e.target.files[0])
  }

  //I had to rearrange the addPost controller in teh server
  //pls head to the post controller in server to check out that mess

  //i need to do something with this
  const post = { prompt, media, size, canvas, image, description }

  //so now I need to handle uploading the image file we got from
  // handleImgUrl to cloudinary and getting whatever it is back
  //and THEN add that to the body of my post
  const handleImageUpload = async () => {
    //idk in what situations this is necessary but apparently
    //uploading to cloudinary is one
    const formData = new formData()
    formData.append('file', image);
    formData.append('upload_preset', preset)

    //for the fetch endpoint you need to grab the upload endpoint
    //by default, the cloudinary API endpoints use this format:
    //https://api.cloudinary.com/v1_1/:cloud_name/:action
    //POST request example: https://api.cloudinary.com/v1_1/demo/image/upload
    //your cloud name is on the dashboard of your cloudinary acct
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        //send post request with formData
        method: 'POST',
        body: formData
    })

    const data = await res.json()

    // const res = await fetch('/post/addPost', {
    //   method: 'POST',
    //   body: JSON.stringify(post),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const json = await res.json()

    // if(!res.ok){
    //   setError(json.error)
    // }
    // if(res.ok){
    //   setPrompt('')
    //   setMedia('')
    //   setCanvas('')
    //   setSize('')
    //   setDescription('')
    //   setFile('')
    //   setError(null)
    //   console.log('new post added')
    // }
  }


  //e.preventDefault()
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
            <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">prompt</label>
                  <input 
                    type="text" 
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    name="prompt"  
                    placeholder="prompt" 
                  />
                </div>
                
                <div>
                  <label htmlFor="media">media</label>
                  <div>
                    <select 
                      name="selectedMedia"
                      onChange={(e) => setMedia(e.target.value)}
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
                      name="selectedSize"
                      onChange={(e) => setSize(e.target.value)}
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
                      name="selectedCanvas"
                      onChange={(e) => setCanvas(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    ></textarea>
                </div>

                <div>
                  <label htmlFor="cloudinaryId">upload image</label>
                  <input 
                    type="file" 
                    onChange={handleImageUrl}
                    name='file'
                    />
                </div>

                <button>submit</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    )
}

export default AddPostForm