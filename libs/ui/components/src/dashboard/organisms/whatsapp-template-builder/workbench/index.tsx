import { zodResolver } from '@hookform/resolvers/zod';
import {
  TemplateBuilderWorkbenchProps,
  WhatsappTemplateBuilderMetadataForm,
  whatsappTemplateBuilderMetadataFormSchema,
} from '@vibe-chat/shared-types';
import { CSSProperties, FC } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from './header';

import { Divider } from '@vibe/core';
import { Content } from './content';
import { Locales } from './locales';
export const Workbench: FC<TemplateBuilderWorkbenchProps> = ({
  style = {},
  categories,
  template,
  localesProps,
  contentProps,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<WhatsappTemplateBuilderMetadataForm>({
    resolver: zodResolver(whatsappTemplateBuilderMetadataFormSchema),
    defaultValues: { name: 'New Template', ...template },
  });

  const selectedCategory = watch('category');
  const templateName = watch('name');

  return (
    <>
      <div
        style={{
          ...style,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header
          onNameChange={(name) => setValue('name', name)}
          templateName={templateName}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => setValue('category', category)}
          categories={categories}
          errors={errors}
        />
        <Divider withoutMargin />
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(12, 1fr)',
            gridTemplateColumns: '3fr 6fr 3fr',
            flexGrow: 1,
          }}
        >
          <Locales
            style={{
              gridColumn: '1 / 2',
              height: '100%',
              gridRow: '1 / 13',
            }}
            {...localesProps}
          />
          <div
            style={{
              gridColumn: '2 / 3',
              height: '100%',
              gridRow: '1 / 13',
            }}
          >
            <Content {...contentProps} />
          </div>
          <Preview
            style={{
              gridColumn: '3 / 4',
              height: '100%',
              gridRow: '1 / 13',
            }}
          />
        </div>
      </div>
    </>
  );
};

function Preview({ style }: { style?: CSSProperties }) {
  return <div style={{ ...style }}>Preview works!</div>;
}
