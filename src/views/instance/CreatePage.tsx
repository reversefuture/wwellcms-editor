import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Form, Input, Select, Upload, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'

interface Speaker {
  id: string
  name: string
  credentials: string
  bio: string
}

interface Event {
  id: string
  image: string | null
  title: string
  speaker: string
  language: string
  description: string
}

const EditableText: React.FC<{
  value: string
  onChange: (value: string) => void
  maxLength?: number
  rows?: number
}> = ({ value, onChange, maxLength, rows = 1 }) => {
  const [isEditing, setIsEditing] = useState(false)

  return isEditing ? (
    <Input.TextArea
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={() => setIsEditing(false)}
      maxLength={maxLength}
      rows={rows}
      autoFocus
      className="w-full"
    />
  ) : (
    <div
      className="editable-text p-2 hover:border hover:border-dashed hover:border-gray-300 cursor-text"
      onClick={() => setIsEditing(true)}
    >
      {value || 'Click to edit'}
    </div>
  )
}

const SpeakerComponent: React.FC<{
  speaker: Speaker
  onUpdate: (id: string, field: keyof Speaker, value: string) => void
}> = ({ speaker, onUpdate }) => {
  return (
    <div className="p-4 mb-4 bg-gray-50 rounded-lg">
      <Form layout="vertical">
        <Form.Item label="Speaker Name">
          <EditableText
            value={speaker.name}
            onChange={value => onUpdate(speaker.id, 'name', value)}
          />
        </Form.Item>
        <Form.Item label="Credentials">
          <EditableText
            value={speaker.credentials}
            onChange={value => onUpdate(speaker.id, 'credentials', value)}
            maxLength={10}
          />
        </Form.Item>
        <Form.Item label="Bio">
          <EditableText
            value={speaker.bio}
            onChange={value => onUpdate(speaker.id, 'bio', value)}
            maxLength={50}
            rows={3}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

const EventComponent: React.FC<{
  event: Event
  onUpdate: (id: string, field: keyof Event, value: string) => void
  onImageUpload: (id: string, file: File) => void
}> = ({ event, onUpdate, onImageUpload }) => {
  const uploadProps: UploadProps = {
    beforeUpload: file => {
      onImageUpload(event.id, file)
      return false // Prevent default upload behavior
    },
    showUploadList: false,
  }

  return (
    <div className="p-4 mb-4 bg-gray-50 rounded-lg">
      <Form layout="vertical">
        <Form.Item label="Image">
          {event.image ? (
            <img
              src={event.image}
              alt="Event"
              className="w-32 h-32 object-cover mb-2 cursor-pointer"
              onClick={() =>
                document.getElementById(`upload-${event.id}`)?.click()
              }
            />
          ) : (
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          )}
          <input
            id={`upload-${event.id}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files?.[0]) {
                onImageUpload(event.id, e.target.files[0])
              }
            }}
          />
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

const CreatePage: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [events, setEvents] = useState<Event[]>([])

  const addSpeaker = () => {
    const newSpeaker: Speaker = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      credentials: '',
      bio: '',
    }
    setSpeakers([...speakers, newSpeaker])
  }

  const addEvent = () => {
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      image: null,
      title: '',
      speaker: '',
      language: 'English',
      description: '',
    }
    setEvents([...events, newEvent])
  }

  const updateSpeaker = (id: string, field: keyof Speaker, value: string) => {
    setSpeakers(
      speakers.map(speaker =>
        speaker.id === id ? { ...speaker, [field]: value } : speaker
      )
    )
  }

  const updateEvent = (id: string, field: keyof Event, value: string) => {
    setEvents(
      events.map(event =>
        event.id === id ? { ...event, [field]: value } : event
      )
    )
  }

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      setEvents(
        events.map(event =>
          event.id === id ? { ...event, image: reader.result as string } : event
        )
      )
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Event Editor</h1>
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <h2 className="text-xl font-semibold mb-2">Speakers</h2>
          {speakers.map(speaker => (
            <SpeakerComponent
              key={speaker.id}
              speaker={speaker}
              onUpdate={updateSpeaker}
            />
          ))}
          <Button type="primary" onClick={addSpeaker} className="mt-2">
            Add Speaker
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          {events.map(event => (
            <EventComponent
              key={event.id}
              event={event}
              onUpdate={updateEvent}
              onImageUpload={handleImageUpload}
            />
          ))}
          <Button type="primary" onClick={addEvent} className="mt-2">
            Add Event
          </Button>
        </div>
      </Space>
    </div>
  )
}

export default CreatePage
