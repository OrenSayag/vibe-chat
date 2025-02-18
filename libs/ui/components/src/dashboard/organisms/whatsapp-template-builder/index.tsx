'use client';
import {
  WhatsappTemplateBuilderProps,
  WhatsappTemplateStatus,
} from '@vibe-chat/shared-types';
import { Box, Button, Divider, Flex, Heading, Label, Toast } from '@vibe/core';
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
  templateStatus,
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
          templateStatus={templateStatus}
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
  templateStatus,
}: {
  isNewTemplate?: boolean;
  onGoBack: () => void;
  pendingSave?: boolean;
  isDraft?: boolean;
  canSave?: boolean;
  onSave: () => void;
  step: 'metadata' | 'workbench';
  templateStatus?: WhatsappTemplateStatus;
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
          {templateStatus && (
            <Label
              color={
                templateStatus === WhatsappTemplateStatus.REJECTED
                  ? 'negative'
                  : 'positive'
              }
              text={templateStatus}
            />
          )}
        </Flex>
        <Flex gap={'small'}>
          <Button
            size="small"
            disabled={pendingSave || !canSave}
            onClick={onSave}
          >
            {step === 'metadata' ? 'Continue' : 'Save'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
