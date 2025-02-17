import { TemplateBuilderWorkbenchContentProps } from '@vibe-chat/shared-types';
import { Box, Text, TextArea } from '@vibe/core';
import { FC } from 'react';
import { SectionLabel } from '../section-label';

type Props = TemplateBuilderWorkbenchContentProps['bodyProps'];

export const Body: FC<Props> = ({ style = {}, value, onChange, readOnly }) => {
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        <Description />
        <Input value={value ?? ''} onChange={onChange} disabled={readOnly} />
      </div>
    </>
  );
};
function Description() {
  return (
    <Box>
      <SectionLabel>Body</SectionLabel>
      <Text color="secondary">Enter text in selected langauge</Text>
    </Box>
  );
}

function Input({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Box marginTop="small">
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text in selected langauge"
        showCharCount
        maxLength={1024}
        disabled={disabled}
        style={{
          cursor: disabled ? 'not-allowed' : 'auto',
        }}
      />
    </Box>
  );
}
