'use client';

import { useCreateSubscriptionTemplate } from '@vibe-chat/next-services';
import { User } from '@vibe-chat/shared-types';
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
