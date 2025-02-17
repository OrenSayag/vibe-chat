'use client';

import { useWhatsappTemplateBuilder } from '@vibe-chat/next-services';
import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { FC } from 'react';
import { WhatsappTemplateBuilder } from '.';

type Props = {
  templateByLocale?: WhatsappTemplate[];
};

export const WhatsappTemplateBuilderProvider: FC<Props> = ({ templateByLocale }) => {
  const props = useWhatsappTemplateBuilder({ templateByLocale });
  return (
    <>
      <WhatsappTemplateBuilder {...props} />
    </>
  );
};
