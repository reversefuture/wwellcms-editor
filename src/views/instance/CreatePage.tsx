import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Form, Input, Select, Upload, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import EditableText from './EditableText'
import EventComponent from './Event'

interface Speaker {
  id: string
  name: string
  credentials: string
  bio: string
}

export interface Event {
  id: string
  image: string | null
  title: string
  speaker: string
  language: string
  description: string
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

  return (
    <div className="min-w-[600px] mx-auto">
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
              // onImageUpload={handleImageUpload}
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
