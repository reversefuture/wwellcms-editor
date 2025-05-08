import React, { useState } from 'react';
import { Upload, Input, Select, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const EventComponent: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [speaker, setSpeaker] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <Upload className="mb-4">
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>

      <div onClick={handleEditClick} className="hover:bg-gray-100 p-2 rounded">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            className="mb-2"
          />
        ) : (
          <h2 className="text-xl font-bold">{title}</h2>
        )}
      </div>

      <div onClick={handleEditClick} className="hover:bg-gray-100 p-2 rounded">
        {isEditing ? (
          <Input
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            placeholder="Speaker Name"
            className="mb-2"
          />
        ) : (
          <p className="text-gray-700">{speaker}</p>
        )}
      </div>

      <div onClick={handleEditClick} className="hover:bg-gray-100 p-2 rounded">
        {isEditing ? (
          <Select
            value={language}
            onChange={(value) => setLanguage(value)}
            placeholder="Select Language"
            className="w-full mb-2"
          >
            <Option value="en">English</Option>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
          </Select>
        ) : (
          <p className="text-gray-700">{language}</p>
        )}
      </div>

      <div onClick={handleEditClick} className="hover:bg-gray-100 p-2 rounded">
        {isEditing ? (
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            maxLength={10}
            className="mb-2"
          />
        ) : (
          <p className="text-gray-700">{description}</p>
        )}
      </div>

      <Button type="primary" onClick={() => console.log('Add Event')}>
        Add Offer
      </Button>
    </div>
  );
};

export default EventComponent;
