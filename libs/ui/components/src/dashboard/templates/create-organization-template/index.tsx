import { FC } from 'react';
import { Heading, Text } from '@vibe/core';
import { OrganizationForm } from '../../organisms/organization-form';
import { CreateOrganizationTemplateProps } from '@vibe-chat/shared-types';
import { useTranslations } from 'next-intl';
import { useDir } from '@vibe-chat/next-services';

export const CreateOrganizationTemplate: FC<
  CreateOrganizationTemplateProps
> = ({ style = {}, organizationFormProps }) => {
  const t = useTranslations('CreateOrganizationTemplate');
  const dir = useDir();

  return (
    <>
      <div
        style={{
          ...style,
          width: 'fit-content',
          margin: '0 auto',
          padding: '2.5em 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          direction: dir,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          <Heading>{t('Title')}</Heading>
          <Text type="text2">{t('Subtitle')}</Text>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            alignItems: 'center',
          }}
        >
          <OrganizationForm {...organizationFormProps} />
        </div>
        {organizationFormProps.error && (
          <Text style={{ color: 'red' }}>{organizationFormProps.error}</Text>
        )}
      </div>
    </>
  );
};
