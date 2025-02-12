import { TemplateBuilderWorkbenchContentProps } from '@vibe-chat/shared-types';
import { Box, Text, TextField } from '@vibe/core';
import { FC } from 'react';
import { SectionLabel } from '../section-label';

type Props = TemplateBuilderWorkbenchContentProps['footerProps'];

export const Footer: FC<Props> = ({ style = {}, value, onChange }) => {
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        <Description />
        <Input value={value ?? ''} onChange={onChange} />
      </div>
    </>
  );
};

function Description() {
  return (
    <Box>
      <SectionLabel>Footer</SectionLabel>
      <Text color="secondary">Enter text in selected language</Text>
    </Box>
  );
}

function Input({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Box marginTop="small">
      <TextField
        value={value}
        onChange={onChange}
        placeholder="Enter text in selected language"
      />
    </Box>
  );
}
