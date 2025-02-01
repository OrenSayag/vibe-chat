import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import {
  WhatsappTemplate,
  WhatsappTemplateBodyComponent,
  WhatsappTemplateButtonsComponent,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateComponentType,
  WhatsappTemplateFooterComponent,
  WhatsappTemplateHeaderComponent,
} from '@monday-whatsapp/shared-types';
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
    <div>
      {comp.buttons.map((btn) => (
        <div key={btn.text}>
          <Button>
            <Text>{btn.text}</Text>
          </Button>
        </div>
      ))}
    </div>
  );
}
