'use client';
import { WhatsappTemplateBuilderProps } from '@vibe-chat/shared-types';
import { Box, Button, Divider, Flex, Heading, Toast } from '@vibe/core';
import { ChevronLeft } from 'lucide-react';
import { FC } from 'react';
import { Metadata } from './metadata';
import { Workbench } from './workbench';

export const WhatsappTemplateBuilder: FC<WhatsappTemplateBuilderProps> = ({
  style = {},
  isNewTemplate,
  onGoBack,
  metadataProps,
  workbenchProps,
  canSave,
  onSave,
  step,
  pendingSave,
}) => {
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        <Header
          isNewTemplate={isNewTemplate}
          onGoBack={onGoBack}
          pendingSave={pendingSave}
          isDraft={workbenchProps.contentProps.isDraft}
          canSave={canSave}
          onSave={onSave}
          step={step}
        />
        <Divider />
        {step === 'metadata' && <Metadata {...metadataProps} />}
        {step === 'workbench' && <Workbench {...workbenchProps} />}
      </div>
    </>
  );
};

function Header({
  onGoBack,
  isNewTemplate,
  isDraft,
  canSave,
  onSave,
  pendingSave,
  step,
}: {
  isNewTemplate?: boolean;
  onGoBack: () => void;
  pendingSave?: boolean;
  isDraft?: boolean;
  canSave?: boolean;
  onSave: () => void;
  step: 'metadata' | 'workbench';
}) {
  const title = isNewTemplate ? 'Create Template' : 'Edit Template';
  return (
    <Box padding={'medium'}>
      <Flex justify={'space-between'} align={'center'}>
        <Flex align={'center'} gap={'medium'}>
          <Button onClick={onGoBack} kind={'secondary'} size="small">
            <ChevronLeft />
          </Button>
          <Heading type="h2">{title}</Heading>
        </Flex>
        <Flex gap={'small'}>
          <Button
            size="small"
            disabled={pendingSave || !canSave}
            onClick={onSave}
          >
            {step === 'metadata' ? 'Continue' : 'Save draft'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
