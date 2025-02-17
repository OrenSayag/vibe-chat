'use client';

import { useWhatsappTemplateBuilder } from '@vibe-chat/next-services';
import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { FC } from 'react';
import { WhatsappTemplateBuilder } from '.';

type Props = {
  template?: WhatsappTemplate;
};

export const WhatsappTemplateBuilderProvider: FC<Props> = ({ template }) => {
  const props = useWhatsappTemplateBuilder({ template });
  return (
    <>
      <WhatsappTemplateBuilder {...props} />
    </>
  );
};
