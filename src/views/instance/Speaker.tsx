import React, { useState } from 'react';
import { Input, Button } from 'antd';

const { TextArea } = Input;

const SpeakerComponent: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [credentials, setCredentials] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div onClick={handleEditClick} className="hover:bg-gray-100 p-2 rounded">
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Speaker Name"
            className="mb-2"
          />
        ) : (
          <h2 className="text-xl font-bold">{name}</h2>
        )}
      </div>

      <div onClick={handleEditClick} className="hover:bg-gray-100 p-2 rounded">
        {isEditing ? (
          <Input
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
            placeholder="Credentials"
            maxLength={10}
            className="mb-2"
          />
        ) : (
          <p className="text-gray-700">{credentials}</p>
        )}
      </div>

      <div onClick={handleEditClick} className="hover:bg-gray-100 p-2 rounded">
        {isEditing ? (
          <TextArea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            maxLength={50}
            className="mb-2"
          />
        ) : (
          <p className="text-gray-700">{bio}</p>
        )}
      </div>

      <Button type="primary" onClick={() => console.log('Add Speaker')}>
        Add Speaker
      </Button>
    </div>
  );
};

export default SpeakerComponent;
