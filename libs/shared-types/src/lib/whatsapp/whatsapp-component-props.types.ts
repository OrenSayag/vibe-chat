import {
  WhatsappConnectionViewProps,
  WhatsappTemplate,
} from '@vibe-chat/shared-types';
import { CSSProperties } from 'react';

export type WhatsappMessageTemplateSelectorProps = {
  className?: string;
  style?: CSSProperties;
  templates: WhatsappTemplate[];
  selectedTemplateName?: string;
  loading?: boolean;
  error?: boolean;
  onSelect(template: WhatsappTemplate): void;
};

export type WhatsappIntegrationTemplateProps = {
  connectionViewProps: WhatsappConnectionViewProps;
};
