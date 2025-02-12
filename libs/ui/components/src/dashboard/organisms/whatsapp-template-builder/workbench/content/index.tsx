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
          <Header />
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

function Header() {
  return (
    <Box padding="small">
      <Flex justify="space-between">
        <Box>
          <Text>Edit template</Text>
        </Box>
        <Box>
          <Flex direction="row" align="end" gap="xs">
            <Button size="xs">Save Draft</Button>
            <Button size="xs">Publish</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
