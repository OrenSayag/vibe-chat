import { zodResolver } from '@hookform/resolvers/zod';
import {
  ListItem as IListItem,
  WhatsappTemplateCategory,
} from '@vibe-chat/shared-types';
import {
  Dropdown,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  TextField
} from '@vibe/core';
import { CSSProperties, FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

type Props = {
  style?: CSSProperties;
  categories: IListItem<WhatsappTemplateCategory>[];
  onSubmit: (metadata: IMetadata) => void;
  pendingSubmit?: boolean;
  languages: IListItem[];
};

type IMetadata = {
  category: WhatsappTemplateCategory;
  name: string;
  languages: IListItem[];
};

const metadataSchema = z.object({
  category: z.nativeEnum(WhatsappTemplateCategory, {
    required_error: 'Category is required',
  }),
  name: z.string().min(1, 'Name is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
});

const sectionWrapperStyle: CSSProperties = {
  border: '1px solid',
  borderRadius: '15px',
  padding: '1.5em',
  marginBottom: '.5em',
};

export const Metadata: FC<Props> = ({
  style = {},
  categories,
  onSubmit,
  pendingSubmit = false,
  languages,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IMetadata>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      category: undefined,
      name: '',
      languages: [],
    },
  });

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(data);
  });

  const containerStyle: CSSProperties = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1em',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmitForm} style={style}>
        <Flex direction="column" gap="small">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Category
                style={{
                  width: '100%',
                  ...sectionWrapperStyle,
                }}
                categories={categories}
                selectedCategory={field.value}
                onSelect={field.onChange}
                error={errors.category?.message}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Name
                style={{
                  width: '100%',
                  ...sectionWrapperStyle,
                }}
                name={field.value}
                onChange={field.onChange}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <Languages
                style={{
                  width: '100%',
                  ...sectionWrapperStyle,
                }}
                languages={languages}
                onChange={field.onChange}
                selectedLanguages={field.value}
                error={errors.languages?.message}
              />
            )}
          />
        </Flex>
      </form>
    </div>
  );
};

function Category({
  categories,
  selectedCategory,
  onSelect,
  error,
  style,
}: {
  categories: IListItem<WhatsappTemplateCategory>[];
  selectedCategory?: WhatsappTemplateCategory;
  onSelect: (category: WhatsappTemplateCategory) => void;
  error?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      <Heading type="h3" style={{ marginBottom: '0.5em' }}>
        Category
      </Heading>
      <Text type="text2" color="secondary" style={{ marginBottom: '1em' }}>
        Select a template category
      </Text>
      <List style={{ width: '100%', marginBottom: '1em' }}>
        {categories.map((category) => (
          <ListItem
            selected={selectedCategory === category.value}
            key={category.value}
            onClick={() => onSelect(category.value)}
          >
            <Text>{category.label}</Text>
          </ListItem>
        ))}
      </List>
      <ErrorMessage error={error} />
    </div>
  );
}

function Name({
  name,
  onChange,
  error,
  style,
}: {
  name: string;
  onChange: (name: string) => void;
  error?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      <Heading type="h3" style={{ marginBottom: '0.5em' }}>
        Name
      </Heading>
      <Text type="text2" color="secondary" style={{ marginBottom: '1em' }}>
        Enter a name for your template
      </Text>
      <TextField value={name} onChange={(value) => onChange(value)} />
      <ErrorMessage error={error} />
    </div>
  );
}

function Languages({
  languages,
  onChange,
  selectedLanguages,
  error,
  style,
}: {
  languages: IListItem[];
  onChange: (languages: IListItem[]) => void;
  selectedLanguages: IListItem[];
  error?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      <Heading type="h3" style={{ marginBottom: '0.5em' }}>
        Languages
      </Heading>
      <Text type="text2" color="secondary" style={{ marginBottom: '1em' }}>
        Select the languages you want to support
      </Text>
      <Dropdown
        clearable={false}
        value={selectedLanguages}
        searchable={false}
        options={languages}
        onChange={(selected) => onChange(selected)}
        multi
      />
      <ErrorMessage error={error} />
    </div>
  );
}

function ErrorMessage({ error }: { error?: string }) {
  return error ? (
    <Text type="text2" style={{ color: 'red', marginTop: '0.5em' }}>
      {error}
    </Text>
  ) : null;
}
