import {
  ListItem as IListItem,
  WhatsappTemplateBuilderMetadataProps,
  WhatsappTemplateCategory,
} from '@vibe-chat/shared-types';
import { Dropdown, Flex, Heading, Text, TextField } from '@vibe/core';
import { CSSProperties, FC } from 'react';
import * as z from 'zod';

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

export const Metadata: FC<WhatsappTemplateBuilderMetadataProps> = ({
  style = {},
  categories,
  languages,
  formData,
  onChange,
  errors = {},
  readOnly,
}) => {
  const containerStyle: CSSProperties = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1em',
  };

  return (
    <div style={containerStyle}>
      <Flex direction="column" gap="small">
        <Category
          style={{
            width: '100%',
            ...sectionWrapperStyle,
          }}
          categories={categories}
          selectedCategory={formData.category}
          onSelect={onChange.category}
          error={errors.category}
          readOnly={readOnly}
        />

        <Name
          style={{
            width: '100%',
            ...sectionWrapperStyle,
          }}
          name={formData.name}
          onChange={onChange.name}
          error={errors.name}
          readOnly={readOnly}
        />

        <Languages
          style={{
            width: '100%',
            ...sectionWrapperStyle,
          }}
          languages={languages}
          onChange={onChange.languages}
          selectedLanguages={formData.languages}
          error={errors.languages}
          readOnly={readOnly}
        />
      </Flex>
    </div>
  );
};

function Category({
  categories,
  selectedCategory,
  onSelect,
  error,
  style,
  readOnly,
}: {
  categories: IListItem<WhatsappTemplateCategory>[];
  selectedCategory?: WhatsappTemplateCategory;
  onSelect: (category: WhatsappTemplateCategory) => void;
  error?: string;
  style?: CSSProperties;
  readOnly?: boolean;
}) {
  return (
    <div style={style}>
      <Heading type="h3" style={{ marginBottom: '0.5em' }}>
        Category
      </Heading>
      <Text type="text2" color="secondary" style={{ marginBottom: '1em' }}>
        Select a template category
      </Text>
      <Dropdown
        clearable={false}
        value={categories.find((c) => c.value === selectedCategory)}
        searchable={false}
        options={categories}
        onChange={(selected) => onSelect(selected.value)}
        disabled={readOnly}
      />
      <ErrorMessage error={error} />
    </div>
  );
}

function Name({
  name,
  onChange,
  error,
  style,
  readOnly,
}: {
  name: string;
  onChange: (name: string) => void;
  error?: string;
  style?: CSSProperties;
  readOnly?: boolean;
}) {
  return (
    <div style={style}>
      <Heading type="h3" style={{ marginBottom: '0.5em' }}>
        Name
      </Heading>
      <Text type="text2" color="secondary" style={{ marginBottom: '1em' }}>
        Enter a name for your template
      </Text>
      <TextField
        value={name}
        onChange={(value) => onChange(value)}
        disabled={readOnly}
      />
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
  readOnly,
}: {
  languages: IListItem[];
  onChange: (languages: IListItem[]) => void;
  selectedLanguages: IListItem[];
  error?: string;
  style?: CSSProperties;
  readOnly?: boolean;
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
        onChange={onChange}
        multi
        disabled={readOnly}
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
