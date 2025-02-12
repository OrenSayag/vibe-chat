import { FC } from 'react';
import { cn } from '@vibe-chat/ui-utils';
import {
  WhatsappTemplate,
  WhatsappTemplateBodyComponent,
  WhatsappTemplateButtonsComponent,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateComponentType,
  WhatsappTemplateFooterComponent,
  WhatsappTemplateHeaderComponent,
  WhatsappTemplateButtonType,
} from '@vibe-chat/shared-types';
import { Button, Text } from '@vibe/core';

interface Props {
  className?: string;
  template: WhatsappTemplate;
}

export const TemplateMessage: FC<Props> = ({ className, template }) => {
  const headerComp = template.components.find(
    (c) => c.type === WhatsappTemplateComponentType.HEADER
  );
  const bodyComp = template.components.find(
    (c) => c.type === WhatsappTemplateComponentType.BODY
  );
  const footerComp = template.components.find(
    (c) => c.type === WhatsappTemplateComponentType.FOOTER
  );
  const buttonsComp = template.components.find(
    (c) => c.type === WhatsappTemplateComponentType.BUTTONS
  );
  return (
    <>
      <div className={cn(className)}>
        {headerComp && <Header comp={headerComp} />}
        {bodyComp && <Body comp={bodyComp} />}
        {footerComp && <Footer comp={footerComp} />}
        {buttonsComp && <Buttons comp={buttonsComp} />}
      </div>
    </>
  );
};

function Header({ comp }: { comp: WhatsappTemplateHeaderComponent }) {
  return (
    <div>
      {comp.format === WhatsappTemplateComponentFormat.TEXT && (
        <Text
          style={{
            fontWeight: 'bold',
          }}
        >
          {comp.text}
        </Text>
      )}
    </div>
  );
}
function Body({ comp }: { comp: WhatsappTemplateBodyComponent }) {
  return (
    <Text
      style={{
        textWrap: 'wrap',
      }}
    >
      {comp.text}
    </Text>
  );
}
function Footer({ comp }: { comp: WhatsappTemplateFooterComponent }) {
  return (
    <Text
      style={{
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 'small',
      }}
    >
      {comp.text}
    </Text>
  );
}
function Buttons({ comp }: { comp: WhatsappTemplateButtonsComponent }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em',
        paddingTop: '0.5em',
        margin: '0 auto',
      }}
    >
      {comp.buttons.map((btn) => (
        <div key={btn.text}>
          <Button kind="primary" size="small">
            {btn.type === WhatsappTemplateButtonType.PHONE_NUMBER && (
              <span>{btn.text}</span>
            )}
            {btn.type === WhatsappTemplateButtonType.URL && (
              <span>{btn.text}</span>
            )}
            {btn.type === WhatsappTemplateButtonType.COPY_CODE && (
              <span>{btn.text}</span>
            )}
            {btn.type === WhatsappTemplateButtonType.QUICK_REPLY && (
              <span>{btn.text}</span>
            )}
            {btn.type === WhatsappTemplateButtonType.FLOW && (
              <span>{btn.text}</span>
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
