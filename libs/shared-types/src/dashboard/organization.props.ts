import { CSSProperties } from 'react';
import { OrganizationInfoSchema } from '@monday-whatsapp/shared-types';

export type OrganizationFormProps = {
  style?: CSSProperties;
  onSubmit(
    data: Omit<OrganizationInfoSchema, 'image'> & {
      image?: File | string;
    }
  ): void;
  pendingSubmit?: boolean;
  data?: Omit<OrganizationInfoSchema, 'image'> & {
    image?: string;
  };
  error?: string;
};

export type CreateOrganizationTemplateProps = {
  style?: CSSProperties;
  organizationFormProps: OrganizationFormProps;
};
