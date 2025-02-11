'use client';
import { Box, Button, Divider, Flex, Heading } from '@vibe/core';
import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { CSSProperties, FC } from 'react';
import { ChevronLeft } from 'lucide-react';
type Props = {
  style?: CSSProperties;
  template?: WhatsappTemplate;
  onGoBack: () => void;
  onSubmit: {
    label: string;
    onClick: () => void;
  };
  pendingSubmit?: boolean;
};

export const WhatsappTemplateBuilder: FC<Props> = ({
  style = {},
  template,
  onGoBack,
  onSubmit,
}) => {
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        <Header id={template?.id} submit={onSubmit} onGoBack={onGoBack} />
        <Divider />
      </div>
    </>
  );
};

function Header({
  id,
  submit,
  onGoBack,
  pendingSubmit,
}: {
  id?: string;
  submit: {
    label: string;
    onClick: () => void;
  };
  onGoBack: () => void;
  pendingSubmit?: boolean;
}) {
  const title = id ? 'Edit Template' : 'Create Template';
  return (
    <Box padding={'medium'}>
      <Flex justify={'space-between'} align={'center'}>
        <Flex align={'center'} gap={'medium'}>
          <Button onClick={onGoBack} kind={'secondary'} size="small">
            <ChevronLeft />
          </Button>
          <Heading type="h2">{title}</Heading>
        </Flex>
        <Button onClick={submit.onClick} loading={pendingSubmit}>
          {submit.label}
        </Button>
      </Flex>
    </Box>
  );
}
