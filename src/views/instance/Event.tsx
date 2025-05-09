import React, { useState } from 'react'
import { InboxOutlined, CloseOutlined } from '@ant-design/icons'
import { Form, Select, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import EditableText from './EditableText'
import { Event } from './CreatePage'

const { Dragger } = Upload

const EventComponent: React.FC<{
  event: Event
  onUpdate: (id: string, field: keyof Event, value: string) => void
}> = ({ event, onUpdate }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setPreviewImage(e.target.result)
      }
    }
    reader.readAsDataURL(file)
    return false // Prevent default upload behavior
  }

  const handleRemovePreview = () => {
    setPreviewImage(null)
  }

  const uploadProps: UploadProps = {
    name: 'files',
    multiple: true,
    action: '/api/files',
    accept: 'image/*',
    maxCount: 5,
    data: {
      container: 'event-images',
    },
    beforeUpload: handleImageUpload,
    onChange(info) {
      const { status, response } = info.file
      if (status === 'done') {
        // Assuming the API returns the image URL in response.url
        if (response?.url) {
          onUpdate(event.id, 'image', response.url)
          message.success(`${info.file.name} file uploaded successfully.`)
          setPreviewImage(null) // Clear preview after successful upload
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
        setPreviewImage(null) // Clear preview on error
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <div className="p-4 mb-4 bg-gray-50 rounded-lg">
      <Form layout="horizontal">
        <Form.Item label="Image">
          {previewImage ? (
            <div className="relative w-32 h-32">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover mb-2"
              />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={handleRemovePreview}
              >
                <CloseOutlined />
              </button>
            </div>
          ) : event.image ? (
            <img
              src={event.image}
              alt="Event"
              className="w-32 h-32 object-cover mb-2 cursor-pointer"
              onClick={() =>
                document.getElementById(`upload-${event.id}`)?.click()
              }
            />
          ) : (
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag image files to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for up to 5 images. Only image files are allowed.
              </p>
            </Dragger>
          )}
          {/* <input
            id={`upload-${event.id}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0])
              }
            }}
          /> */}
        </Form.Item>
        {/* 隐藏的 image 字段，保存上传后的图片 URL */}
        <Form.Item name="imageUrl" hidden>
          <input />
        </Form.Item>
        <Form.Item label="Title">
          <EditableText
            value={event.title}
            onChange={value => onUpdate(event.id, 'title', value)}
            rows={2}
          />
        </Form.Item>
        <Form.Item label="Speaker">
          <EditableText
            value={event.speaker}
            onChange={value => onUpdate(event.id, 'speaker', value)}
          />
        </Form.Item>
        <Form.Item label="Language">
          <Select
            value={event.language}
            onChange={value => onUpdate(event.id, 'language', value)}
            options={[
              { value: 'English', label: 'English' },
              { value: 'Chinese', label: 'Chinese' },
              { value: 'Spanish', label: 'Spanish' },
            ]}
            className="w-full"
          />
        </Form.Item>
        <Form.Item label="Description">
          <EditableText
            value={event.description}
            onChange={value => onUpdate(event.id, 'description', value)}
            maxLength={10}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default EventComponent
