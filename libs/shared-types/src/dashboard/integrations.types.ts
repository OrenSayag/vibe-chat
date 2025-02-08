export enum IntegrationType {
  WHATSAPP = 'whatsapp',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  MESSENGER = 'messenger',
}

export const isValidIntegrationType = (
  type: string
): type is IntegrationType => {
  return Object.values(IntegrationType).includes(type as IntegrationType);
};
