import { TemplateBuilderWorkbenchContentProps } from '@vibe-chat/shared-types';
import { Box, Button, Divider, Flex, Text } from '@vibe/core';
import { FC } from 'react';
import { Head } from './head';
import { Body } from './body';
import { Footer } from './footer';
import { Buttons } from './buttons';

export const Content: FC<TemplateBuilderWorkbenchContentProps> = ({
  style = {},
  headProps,
  bodyProps,
  footerProps,
  buttonsProps,
  isDraft,
  pendingSave,
  canPublish,
  onSaveDraft,
  onPublish,
}) => {
  return (
    <>
      <div
        style={{
          ...style,
          paddingBottom: '1em',
        }}
      >
        <Box paddingY="small">
          <Header
            isDraft={isDraft ?? false}
            pendingSave={pendingSave ?? false}
            canPublish={canPublish ?? false}
            onSaveDraft={onSaveDraft}
            onPublish={onPublish}
          />
        </Box>
        <Divider withoutMargin />
        <div style={{ marginTop: '1em' }}>
          <Head {...headProps} />
        </div>
        <div style={{ marginTop: '1em' }}>
          <Body {...bodyProps} />
        </div>
        <div style={{ marginTop: '1em' }}>
          <Footer {...footerProps} />
        </div>
        <div style={{ marginTop: '1em' }}>
          <Buttons {...buttonsProps} />
        </div>
      </div>
    </>
  );
};

function Header({
  isDraft,
  onSaveDraft,
  onPublish,
  pendingSave,
  canPublish,
}: {
  isDraft: boolean;
  pendingSave: boolean;
  canPublish: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
}) {
  return (
    <Box padding="small">
      <Flex justify="space-between">
        <Box>
          <Text>Edit template</Text>
        </Box>
        <Box>
          <Flex direction="row" align="end" gap="xs">
            {isDraft && (
              <Button size="xs" disabled={pendingSave} onClick={onSaveDraft}>
                Save Draft
              </Button>
            )}
            <Button size="xs" disabled={!canPublish} onClick={onPublish}>
              Publish
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
