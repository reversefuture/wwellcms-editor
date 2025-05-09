import { Input } from 'antd'
import { useState } from 'react'

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
    <span
      className="editable-text p-2 hover:border hover:border-dashed hover:border-gray-300 cursor-text"
      onClick={() => setIsEditing(true)}
    >
      {value || 'Click to edit'}
    </span>
  )
}

export default EditableText
