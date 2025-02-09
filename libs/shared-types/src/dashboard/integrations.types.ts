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

export const intagrationSubSlugs: Record<
  IntegrationType,
  Record<string, null | string[] | Record<string, string[] | null>> | null
> = {
  [IntegrationType.WHATSAPP]: {
    connection: null,
    templates: null,
  },
  [IntegrationType.INSTAGRAM]: null,
  [IntegrationType.TELEGRAM]: null,
  [IntegrationType.MESSENGER]: null,
};