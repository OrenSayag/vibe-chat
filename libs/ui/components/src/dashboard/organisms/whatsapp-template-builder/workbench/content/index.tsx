import { TemplateBuilderWorkbenchContentProps } from '@vibe-chat/shared-types';
import { FC } from 'react';
import { Body } from './body';
import { Buttons } from './buttons';
import { Footer } from './footer';
import { Head } from './head';

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
