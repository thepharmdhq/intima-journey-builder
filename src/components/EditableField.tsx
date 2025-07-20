
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditableFieldProps {
  label: string;
  value: string | number;
  isEditing: boolean;
  type?: 'text' | 'number' | 'select';
  options?: string[];
  onChange?: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  isEditing,
  type = 'text',
  options = [],
  onChange
}) => {
  const formatDisplayValue = (val: string | number) => {
    if (typeof val === 'string') {
      return val.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return val.toString();
  };

  if (!isEditing) {
    return (
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-sm text-muted-foreground mt-1">
          {formatDisplayValue(value)}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor={label.toLowerCase().replace(' ', '-')} className="text-sm font-medium">
        {label}
      </Label>
      {type === 'select' ? (
        <Select value={value.toString()} onValueChange={onChange}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {formatDisplayValue(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={label.toLowerCase().replace(' ', '-')}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="mt-1"
        />
      )}
    </div>
  );
};

export default EditableField;
