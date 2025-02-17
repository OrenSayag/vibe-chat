'use server';

import { SubscriptionInfo, WhatsappCloudStatus } from '@vibe-chat/shared-types';
import { getWhatsappMessageTemplates } from './get-whatsapp-message-templates';

export async function getWhatsappIntegrationProps(
  info: SubscriptionInfo,
  subscriptionId: string
) {
  const whatsappCloudInfo = info.integrations.whatsappCloudInfo;
  if (
    !whatsappCloudInfo ||
    whatsappCloudInfo.status !== WhatsappCloudStatus.SIGNED
  ) {
    throw new Error('WhatsApp integration is not signed');
  }

  const connectionViewInfo = {
    whatsappBusinessAccountId: whatsappCloudInfo.whatsappBusinessAccountId,
    whatsappNumber: whatsappCloudInfo.whatsappNumber,
    displayName: whatsappCloudInfo.displayName,
    image: whatsappCloudInfo.profilePictureUrl,
  };

  const templates = await getWhatsappMessageTemplates({ subscriptionId });
  let error: string | undefined;

  if (!templates.success) {
    error = 'Error loading templates';
  }

  return {
    connectionViewInfo,
    templates: templates.data,
    error,
  };
}
