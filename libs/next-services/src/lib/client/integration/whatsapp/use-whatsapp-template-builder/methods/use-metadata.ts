import { zodResolver } from '@hookform/resolvers/zod';
import {
  ListItem,
  metadataSchema,
  WhatsappTemplateBuilderMetadataProps,
  WhatsappTemplateCategory,
} from '@vibe-chat/shared-types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type FormData = z.infer<typeof metadataSchema>;

type UseMetadataInput = {
  categories: ListItem<WhatsappTemplateCategory>[];
  languages: ListItem[];
  data?: FormData;
};

export const useMetadata = ({
  categories,
  languages,
  data,
}: UseMetadataInput): WhatsappTemplateBuilderMetadataProps => {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      name: data?.name,
      category: data?.category,
      languages: data?.languages ?? [],
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
