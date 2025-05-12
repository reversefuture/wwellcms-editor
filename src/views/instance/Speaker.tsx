import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Form, Input, Select, Upload, Space } from 'antd'
import EditableText from './EditableText'

export interface Speaker {
  id: string
  name: string
  credentials: string
  bio: string
}

const SpeakerComponent: React.FC<{
  speaker: Speaker
  onUpdate: (id: string, field: keyof Speaker, value: string) => void
}> = ({ speaker, onUpdate }) => {
  return (
    <div className="p-4 mb-4 bg-gray-50 rounded-lg">
      <Form layout="horizontal">
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

export default SpeakerComponent
