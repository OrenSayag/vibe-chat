import { zodResolver } from '@hookform/resolvers/zod';
import {
  ListItem,
  WhatsappTemplate,
  WhatsappTemplateBuilderMetadataProps,
  WhatsappTemplateCategory,
} from '@vibe-chat/shared-types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type UseMetadataInput = {
  template?: WhatsappTemplate;
  categories: ListItem<WhatsappTemplateCategory>[];
  languages: ListItem[];
};

const metadataSchema = z.object({
  category: z.nativeEnum(WhatsappTemplateCategory, {
    required_error: 'Category is required',
  }),
  name: z.string().min(1, 'Name is required'),
  languages: z.array(z.any()).min(1, 'At least one language is required'),
});

type FormData = z.infer<typeof metadataSchema>;

export const useMetadata = ({
  template,
  categories,
  languages,
}: UseMetadataInput): WhatsappTemplateBuilderMetadataProps => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      category: template?.category || WhatsappTemplateCategory.MARKETING,
      name: template?.name || '',
      languages: languages.find(
        (language) => language.value === template?.language
      )
        ? [
            languages.find(
              (language) => language.value === template!.language
            ) as ListItem,
          ]
        : [],
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

  const onSubmit = handleSubmit((data) => {
    // This will be implemented by the parent component
    console.log('Form submitted:', data);
  });

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
