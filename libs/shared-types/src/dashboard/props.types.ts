import { ReactNode } from 'react';
import { OrganizationInfoSchema } from '../lib/subscription.types';
import { OrganizationUserRole } from './organization.types';
import { WhatsappTemplate } from '../lib/whatsapp/whatsapp.types';

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
  };
};

export type WhatsappIntegrationTemplateProps = {
  connectionViewProps: WhatsappConnectionViewProps;
  templatesViewProps: WhatsappTemplatesViewProps;
  error?: string;
};
