const LoginForm = ({ handleSubmit, error, isLoading, formRef }) => {
    return (
      <div className="grid h-screen place-content-center">
      <div className="forms-styles">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data">
          <h3 className="font-bold text-xl">Login</h3>
          <div className="form-layout">
            <input 
              type="text" 
              name="email"
              className='border-2'
              placeholder="email" 
            />
          </div>
          <div className="form-layout">
            <input 
              type="password" 
              name="password"
              className='border-2'
              placeholder="password" 
            />
          </div>
          <button disabled={isLoading} className='w-full transition-color ease-in-out bg-pink-400 p-2 text-white rounded-md uppercase transition-colors hover:bg-pink-200 hover:text-pink-800'>login</button>
        </form>
        {error && <div className='border-2 border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
      </div>
    )
}

export default LoginForm