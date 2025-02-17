import { ReactNode, CSSProperties } from 'react';
import { OrganizationInfoSchema } from '../lib/subscription.types';
import { OrganizationUserRole } from './organization.types';
import {
  WhatsappTemplate,
  WhatsappTemplateCategory,
} from '../lib/whatsapp/whatsapp.types';
import { ListItem } from '../lib/app.types';
import { WhatappTemplateBuilderWorkbenchProps } from '../lib/whatsapp/whatsapp-component-props.types';

export type MainLayoutProps = {
  className?: string;
  children: ReactNode;
  headerProps: HeaderProps;
  organizations: (Omit<OrganizationInfoSchema, 'image'> & {
    subscriptionId: string;
    organizationUserRole: OrganizationUserRole;
    image: string;
  })[];
};

export type HeaderProps = {
  className?: string;
  avatarSrc?: string;
  profileName: string;
  signOut(): void;
};

export type IntegrationNotConnectedViewProps = {
  onConnect: () => void;
};

export type WhatsappConnectionViewProps = {
  whatsappBusinessAccountId: string;
  whatsappNumber: string;
  displayName: string;
  image?: string;
};

export type WhatsappTemplatesViewProps = {
  listProps: {
    templates: WhatsappTemplate[];
    onCreateTemplate: () => void;
    onEditTemplate: (template: WhatsappTemplate) => void;
    onDeleteTemplate: (template: WhatsappTemplate) => void;
    onDeleteMultipleTemplates: (templates: WhatsappTemplate[]) => void;
    pendingDelete?: boolean;
  };
};

export type WhatsappIntegrationTemplateProps = {
  connectionViewProps: WhatsappConnectionViewProps;
  templatesViewProps: WhatsappTemplatesViewProps;
  error?: string;
};
export type WhatsappTemplateBuilderMetadata = {
  category: WhatsappTemplateCategory;
  name: string;
  languages: ListItem[];
};

export type WhatsappTemplateBuilderMetadataProps = {
  categories: ListItem<WhatsappTemplateCategory>[];
  languages: ListItem[];
  style?: CSSProperties;
  formData: WhatsappTemplateBuilderMetadata;
  onChange: {
    category: (category: WhatsappTemplateCategory) => void;
    name: (name: string) => void;
    languages: (languages: ListItem[]) => void;
  };
  errors?: {
    category?: string;
    name?: string;
    languages?: string;
  };
};

export type WhatsappTemplateBuilderProps = {
  style?: CSSProperties;
  metadataProps: WhatsappTemplateBuilderMetadataProps;
  workbenchProps: WhatappTemplateBuilderWorkbenchProps;
  pendingSave?: boolean;
  isNewTemplate?: boolean;
  onGoBack: () => void;
  onSave(): void;
  canSave?: boolean;
  step: 'metadata' | 'workbench';
};
