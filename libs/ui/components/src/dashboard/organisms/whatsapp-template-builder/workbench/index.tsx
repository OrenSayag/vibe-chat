import { zodResolver } from '@hookform/resolvers/zod';
import {
  ListItem as IListItem,
  Locale,
  WhatsappTemplate,
  WhatsappTemplateBuilderForm,
  whatsappTemplateBuilderFormSchema,
  WhatsappTemplateCategory,
} from '@vibe-chat/shared-types';
import { CSSProperties, FC } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from './header';
type WorkbenchProps = {
  style?: CSSProperties;
  categories: IListItem<WhatsappTemplateCategory>[];
  template?: WhatsappTemplate;
  localesProps: {
    onChange: (locale: string) => void;
    selectedLocale: Locale;
    locales: Locale[];
    onCreateLocale: (locale: Locale) => void;
  };
};
import { Divider } from '@vibe/core';
import { Locales } from './locales';
export const Workbench: FC<WorkbenchProps> = ({
  style = {},
  categories,
  template,
  localesProps,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<WhatsappTemplateBuilderForm>({
    resolver: zodResolver(whatsappTemplateBuilderFormSchema),
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
          <Form
            style={{
              gridColumn: '2 / 3',
              height: '100%',
              gridRow: '1 / 13',
            }}
          />
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

function Form({ style }: { style?: CSSProperties }) {
  return <div style={{ ...style }}>Form works!</div>;
}

function Preview({ style }: { style?: CSSProperties }) {
  return <div style={{ ...style }}>Preview works!</div>;
}
