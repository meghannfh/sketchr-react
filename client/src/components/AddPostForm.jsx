import { useState } from 'react'

const AddPostForm = () => {
  const [prompt, setPrompt] = useState('')
  const [media, setMedia] = useState('')
  const [size, setSize] = useState('')
  const [canvas, setCanvas] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  const onChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new formData()
    formData.append('file', image);
    formData.append('upload_preset', )

    const post = { prompt, media, size, canvas, description, file }

    const res = await fetch('/post/addPost', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()

    if(!res.ok){
      setError(json.error)
    }
    if(res.ok){
      setPrompt('')
      setMedia('')
      setCanvas('')
      setSize('')
      setDescription('')
      setFile('')
      setError(null)
      console.log('new post added')
    }
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
                    onChange={onChange}
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