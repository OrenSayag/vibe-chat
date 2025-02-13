'use client';
import { WhatsappTemplateBuilderProps } from '@vibe-chat/shared-types';
import { Box, Button, Divider, Flex, Heading } from '@vibe/core';
import { ChevronLeft } from 'lucide-react';
import { FC } from 'react';
import { Metadata } from './metadata';
import { Workbench } from './workbench';

export const WhatsappTemplateBuilder: FC<WhatsappTemplateBuilderProps> = ({
  style = {},
  isNewTemplate,
  onGoBack,
  onSubmit,
  metadataProps,
  workbenchProps,
  pendingSubmit,
  onPublish,
  onSaveDraft,
  canPublish,
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
          submit={onSubmit}
          onGoBack={onGoBack}
          pendingSubmit={pendingSubmit}
          isDraft={workbenchProps.contentProps.isDraft}
          canPublish={canPublish}
          onSaveDraft={onSaveDraft}
          onPublish={onPublish}
        />
        <Divider />
        {isNewTemplate && <Metadata {...metadataProps} />}
        {!isNewTemplate && <Workbench {...workbenchProps} />}
      </div>
    </>
  );
};

function Header({
  submit,
  onGoBack,
  pendingSubmit,
  isNewTemplate,
  isDraft,
  canPublish,
  onSaveDraft,
  onPublish,
}: {
  isNewTemplate?: boolean;
  submit: {
    label: string;
    onClick: () => void;
  };
  onGoBack: () => void;
  pendingSubmit?: boolean;
  isDraft?: boolean;
  pendingSave?: boolean;
  canPublish?: boolean;
  onSaveDraft?: () => void;
  onPublish?: () => void;
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
          {(isDraft || isNewTemplate) && (
            <Button size="small" disabled={pendingSubmit} onClick={onSaveDraft}>
              {isNewTemplate ? 'Continue' : 'Save draft'}
            </Button>
          )}
          {!isNewTemplate && (
            <Button
              size="small"
              disabled={!canPublish || pendingSubmit}
              onClick={onPublish}
            >
              Publish
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
