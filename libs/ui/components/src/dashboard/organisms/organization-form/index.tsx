import { FC, useState } from 'react';
import {
  OrganizationFormProps,
  organizationInfoSchema,
} from '@vibe-chat/shared-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Text, TextField } from '@vibe/core';
import { useTranslations } from 'next-intl';
import { FileUploadAvatar } from '../../atoms/file-upload-avatar';
import { X } from 'lucide-react';
import { useDir } from '@vibe-chat/next-services';

const schema = organizationInfoSchema;

type FormData = z.infer<typeof schema>;

export const OrganizationForm: FC<OrganizationFormProps> = ({
  style,
  onSubmit,
  data,
  pendingSubmit,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const t = useTranslations('CreateOrganizationTemplate');
  const dir = useDir();
  const [stagedImage, setStagedImage] = useState<{ f: File; url: string }>();

  return (
    <>
      <form
        style={{ ...style, direction: dir }}
        onSubmit={handleSubmit((data) =>
          onSubmit({
            ...data,
            image: stagedImage?.f ?? (data.image as unknown as string),
          })
        )}
      >
        <Box
          style={{
            width: '20em',
            marginBottom: '1.5em',
          }}
        >
          <Text type={'text1'} style={{ marginBottom: '0.5em' }}>
            {t('OrganizationNameField')}
          </Text>
          <TextField
            {...register('displayName')}
            onChange={(_, e) => register('displayName').onChange(e)}
          />
          {errors.displayName && (
            <Text style={{ color: 'red', marginTop: '0.5em' }}>
              {errors.displayName.message}
            </Text>
          )}
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            alignItems: 'center',
          }}
        >
          <Text type={'text1'}>{t('OrganizationPictureField')}</Text>
          <div
            style={{
              position: 'relative',
              marginBottom: '1em',
            }}
          >
            {stagedImage && (
              <button
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  padding: '0.5em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setStagedImage(undefined);
                  setValue('image', undefined);
                }}
              >
                <X />
              </button>
            )}
            <FileUploadAvatar
              style={{
                margin: '0 auto',
              }}
              onChange={(f) =>
                setStagedImage({
                  url: URL.createObjectURL(f),
                  f,
                })
              }
              imageSrc={stagedImage ? stagedImage.url : undefined}
            />
          </div>
          {errors.image && (
            <Text style={{ color: 'red', marginBottom: '1em' }}>
              {errors.image.message}
            </Text>
          )}
          <Button
            type={'submit'}
            style={{ width: '100%' }}
            loading={pendingSubmit}
          >
            {t('SubmitForm')}
          </Button>
        </Box>
        {error && (
          <Text style={{ color: 'red', marginBottom: '1em' }}>{error}</Text>
        )}
      </form>
    </>
  );
};
