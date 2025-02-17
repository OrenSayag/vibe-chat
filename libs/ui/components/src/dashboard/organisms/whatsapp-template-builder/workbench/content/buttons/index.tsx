import {
  TemplateBuilderWorkbenchContentProps,
  WhatsappTemplateButtonType,
} from '@vibe-chat/shared-types';
import { Box, Button, Text, TextField } from '@vibe/core';
import { Copy, Link, MessageSquare, Phone } from 'lucide-react';
import { FC, useContext } from 'react';
import { SectionLabel } from '../section-label';
import { ThemeContext } from 'libs/ui/components/src/dashboard/providers/theme-provider';

type ButtonData = NonNullable<
  TemplateBuilderWorkbenchContentProps['buttonsProps']['value']
>[0];

export const Buttons: FC<
  TemplateBuilderWorkbenchContentProps['buttonsProps']
> = ({ style = {}, value = [], onChange, readOnly }) => {
  const handleAddButton = (type: WhatsappTemplateButtonType) => {
    if (readOnly) return;
    const newButton = {
      text: '',
      type,
    };
    onChange([...value, newButton]);
  };

  const handleUpdateButton = (index: number, updates: Partial<ButtonData>) => {
    if (readOnly) return;
    const newButtons = [...value];
    newButtons[index] = { ...newButtons[index], ...updates };
    onChange(newButtons);
  };

  const handleRemoveButton = (index: number) => {
    if (readOnly) return;
    const newButtons = value.filter((_, i) => i !== index);
    onChange(newButtons);
  };

  return (
    <div style={style}>
      <Description />
      <ButtonList
        buttons={value}
        onUpdate={handleUpdateButton}
        onRemove={handleRemoveButton}
        readOnly={readOnly}
      />
      <AddButtonSelector
        onSelect={handleAddButton}
        disabled={value.length >= 3 || readOnly}
      />
    </div>
  );
};

function Description() {
  return (
    <Box>
      <SectionLabel isOptional>Buttons</SectionLabel>
      <Text color="secondary">Add up to 3 buttons</Text>
    </Box>
  );
}

type ButtonListProps = {
  buttons: ButtonData[] | undefined;
  onUpdate: (index: number, updates: Partial<ButtonData>) => void;
  onRemove: (index: number) => void;
  readOnly?: boolean;
};

function ButtonList({
  buttons = [],
  onUpdate,
  onRemove,
  readOnly,
}: ButtonListProps) {
  if (!buttons.length) return null;

  return (
    <Box
      marginTop="medium"
      style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
    >
      {buttons.map((button, index) => (
        <Box
          key={index}
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1em',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1em',
            }}
          >
            <Text style={{ fontWeight: 500 }}>Button {index + 1}</Text>
            {!readOnly && (
              <Button onClick={() => onRemove(index)}>Remove</Button>
            )}
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <TextField
              value={button.text}
              onChange={(value) => onUpdate(index, { text: value })}
              placeholder="Enter button text"
              disabled={readOnly}
            />

            {button.type === WhatsappTemplateButtonType.PHONE_NUMBER && (
              <TextField
                value={button.phone_number || ''}
                onChange={(value) => onUpdate(index, { phone_number: value })}
                placeholder="Enter phone number"
                disabled={readOnly}
              />
            )}

            {button.type === WhatsappTemplateButtonType.URL && (
              <TextField
                value={button.url || ''}
                onChange={(value) => onUpdate(index, { url: value })}
                placeholder="Enter URL"
                disabled={readOnly}
              />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

type AddButtonSelectorProps = {
  onSelect: (type: WhatsappTemplateButtonType) => void;
  disabled?: boolean;
};

function AddButtonSelector({ onSelect, disabled }: AddButtonSelectorProps) {
  const buttonTypes = [
    {
      type: WhatsappTemplateButtonType.PHONE_NUMBER,
      label: 'Phone Number',
      Icon: Phone,
      description: 'Add a call button',
    },
    {
      type: WhatsappTemplateButtonType.URL,
      label: 'URL',
      Icon: Link,
      description: 'Add a URL button',
    },
    {
      type: WhatsappTemplateButtonType.COPY_CODE,
      label: 'Copy Code',
      Icon: Copy,
      description: 'Add a copy code button',
    },
    {
      type: WhatsappTemplateButtonType.QUICK_REPLY,
      label: 'Quick Reply',
      Icon: MessageSquare,
      description: 'Add a quick reply button',
    },
  ];

  const { theme } = useContext(ThemeContext);

  return (
    <Box marginTop="medium">
      <Text style={{ marginBottom: '1em' }}>Add a button</Text>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em' }}
      >
        {buttonTypes.map((option) => (
          <div
            key={option.type}
            onClick={() => !disabled && onSelect(option.type)}
            style={{
              padding: '1em',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <Box style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
              <option.Icon
                size={24}
                color={theme === 'light' ? 'black' : 'white'}
              />
              <Box>
                <Text style={{ fontWeight: 500 }}>{option.label}</Text>
                <Text color="secondary" style={{ fontSize: '0.875rem' }}>
                  {option.description}
                </Text>
              </Box>
            </Box>
          </div>
        ))}
      </div>
    </Box>
  );
}
