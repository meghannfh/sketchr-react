import { render, fireEvent } from '@testing-library/react'
import AddPostForm from './AddPostForm'

describe('AddPostForm', () => {
  it('updates file state when a file is selected', () => {
    const { getByLabelText } = render(<AddPostForm />)
    const fileInput = getByLabelText('upload image')
    const file = new File(['test image'], 'test.jpg', { type: 'image/jpeg' })

    fireEvent.change(fileInput, { target: { files: [file] } })

    expect(fileInput.files[0]).toStrictEqual(file)
  })
})