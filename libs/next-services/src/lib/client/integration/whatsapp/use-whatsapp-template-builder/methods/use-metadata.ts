import { zodResolver } from '@hookform/resolvers/zod';
import {
  ListItem,
  metadataSchema,
  WhatsappTemplate,
  WhatsappTemplateBuilderMetadataProps,
  WhatsappTemplateCategory,
} from '@vibe-chat/shared-types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type UseMetadataInput = {
  categories: ListItem<WhatsappTemplateCategory>[];
  languages: ListItem[];
  template?: WhatsappTemplate;
};

type FormData = z.infer<typeof metadataSchema>;

export const useMetadata = ({
  categories,
  languages,
  template,
}: UseMetadataInput): WhatsappTemplateBuilderMetadataProps => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      name: template?.name,
      category: template?.category,
      languages: template?.language ? [template.language] : [],
    },
  });

  const formData = watch();

  const handleCategoryChange = (category: WhatsappTemplateCategory) => {
    setValue('category', category, { shouldValidate: true });
  };

  const handleNameChange = (name: string) => {
    setValue('name', name, { shouldValidate: true });
  };

  const handleLanguagesChange = (selectedLanguages: ListItem[]) => {
    setValue('languages', selectedLanguages, { shouldValidate: true });
  };

  return {
    categories,
    languages,
    formData,
    onChange: {
      category: handleCategoryChange,
      name: handleNameChange,
      languages: handleLanguagesChange,
    },
    errors: {
      category: errors.category?.message,
      name: errors.name?.message,
      languages: errors.languages?.message,
    },
  };
};
