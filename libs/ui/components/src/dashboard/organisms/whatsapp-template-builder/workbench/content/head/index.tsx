import {
  TemplateBuilderWorkbenchContentProps,
  WhatsappTemplateComponentFormat,
} from '@vibe-chat/shared-types';
import { Box, Text, TextField } from '@vibe/core';
import { FC, useContext } from 'react';
import { SectionLabel } from '../section-label';
import { Type, Image, Video, FileText, MapPin } from 'lucide-react';
import { Theme, ThemeContext } from '@vibe-chat/components';

export const Head: FC<TemplateBuilderWorkbenchContentProps['headProps']> = ({
  selectedFormat,
  onFormatChange,
  value,
}) => {
  return (
    <>
      <div>
        <Description />
        <TypeSelector
          selectedFormat={selectedFormat}
          onFormatChange={onFormatChange}
        />
        {value && <Input value={value} />}
      </div>
    </>
  );
};

function Description() {
  return (
    <Box>
      <SectionLabel isOptional>Header</SectionLabel>
      <Text color="secondary">Text or media</Text>
    </Box>
  );
}

type TypeSelectorProps = {
  selectedFormat?: WhatsappTemplateComponentFormat;
  onFormatChange: (format: WhatsappTemplateComponentFormat) => void;
};

function TypeSelector({ selectedFormat, onFormatChange }: TypeSelectorProps) {
  const formatOptions = [
    {
      value: WhatsappTemplateComponentFormat.TEXT,
      label: 'Text',
      Icon: Type,
      description: 'Add a text header',
    },
    {
      value: WhatsappTemplateComponentFormat.IMAGE,
      label: 'Image',
      Icon: Image,
      description: 'Add an image header',
    },
    {
      value: WhatsappTemplateComponentFormat.VIDEO,
      label: 'Video',
      Icon: Video,
      description: 'Add a video header',
    },
    {
      value: WhatsappTemplateComponentFormat.DOCUMENT,
      label: 'Document',
      Icon: FileText,
      description: 'Add a document header',
    },
    {
      value: WhatsappTemplateComponentFormat.LOCATION,
      label: 'Location',
      Icon: MapPin,
      description: 'Add a location header',
    },
  ];

  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ marginTop: '1em' }}>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.1em' }}
      >
        {formatOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => onFormatChange(option.value)}
            style={{
              padding: '.1em',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                backgroundColor:
                  selectedFormat === option.value ? 'Highlight' : '',
                padding: '0.5em',
              }}
              border={true}
              rounded="small"
            >
              <option.Icon
                size={24}
                color={theme === Theme.LIGHT ? 'black' : 'white'}
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
    </div>
  );
}

type InputProps = {
  value: TemplateBuilderWorkbenchContentProps['headProps']['value'];
};

function Input({ value }: InputProps) {
  if (!value) return null;

  switch (value.type) {
    case WhatsappTemplateComponentFormat.TEXT:
      return (
        <Box marginTop="small">
          <TextField
            value={value.value}
            onChange={(newValue) => value.onChange(newValue)}
            placeholder="Enter header text"
          />
        </Box>
      );

    case WhatsappTemplateComponentFormat.IMAGE:
    case WhatsappTemplateComponentFormat.VIDEO:
    case WhatsappTemplateComponentFormat.DOCUMENT:
      return (
        <Box marginTop="small">
          <Text>TODO: implemnet upload input</Text>
        </Box>
      );

    default:
      return null;
  }
}
