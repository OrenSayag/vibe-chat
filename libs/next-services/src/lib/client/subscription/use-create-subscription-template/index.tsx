'use client';

import {
  CreateOrganizationTemplateProps,
  OrganizationInfoSchema,
  User,
} from '@monday-whatsapp/shared-types';
import { useCreateSubscription } from '../../subscription/use-create-subscription';

type Input = {
  user: User;
};

type Output = CreateOrganizationTemplateProps;

export function useCreateSubscriptionTemplate({ user }: Input): Output {
  const { createSubscription, pendingCreateSubscription, error } =
    useCreateSubscription();

  return {
    organizationFormProps: {
      onSubmit: (data) => {
        const formData = new FormData();
        const organizationInfo: OrganizationInfoSchema = {
          ...data,
          image: undefined,
        };
        if (typeof data.image === 'string') {
          const val = Number(data.image);
          organizationInfo.image = val;
        }
        formData.append('organizationInfo', JSON.stringify(organizationInfo));
        formData.append('userId', user.id);
        if (data.image instanceof File) {
          const asciiFilename = encodeURIComponent(data.image.name);
          const newFile = new File([data.image], asciiFilename, {
            type: data.image.type,
          });
          formData.append('image', newFile);
        }

        createSubscription(formData);
      },
      pendingSubmit: pendingCreateSubscription,
      error,
    },
  };
}
