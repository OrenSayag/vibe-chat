'use client';

import { useCreateSubscriptionTemplate } from '@monday-whatsapp/next-services';
import { User } from '@monday-whatsapp/shared-types';
import { CreateOrganizationTemplate } from './index';

interface CreateOrganizationTemplateProviderProps {
  user: User;
}

export function CreateOrganizationTemplateProvider({
  user,
}: CreateOrganizationTemplateProviderProps) {
  const props = useCreateSubscriptionTemplate({
    user,
  });

  return <CreateOrganizationTemplate {...props} />;
}
