import {
  ListItem as IListItem,
  WhatsappTemplateBuilderMetadataForm,
  WhatsappTemplateCategory,
} from '@vibe-chat/shared-types';
import {
  Button,
  Dropdown,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  TextField,
} from '@vibe/core';
import { Pencil } from 'lucide-react';
import { CSSProperties, FC, useContext, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { ThemeContext } from '../../../../providers/theme-provider';

type Props = {
  style?: CSSProperties;
  templateName: string;
  selectedCategory: WhatsappTemplateCategory;
  setSelectedCategory: (category: WhatsappTemplateCategory) => void;
  categories: IListItem<WhatsappTemplateCategory>[];
  errors: FieldErrors<WhatsappTemplateBuilderMetadataForm>;
  onNameChange: (name: string) => void;
  readOnly?: boolean;
};

export const Header: FC<Props> = ({
  style = {},
  templateName,
  selectedCategory,
  setSelectedCategory,
  categories,
  errors,
  onNameChange,
  readOnly,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { theme } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid },
    setValue,
  } = useForm<{ name: string }>({
    defaultValues: { name: templateName },
  });

  const onSubmit = (data: { name: string }) => {
    onNameChange(data.name);
    setModalOpen(false);
  };

  return (
    <Flex justify="space-between" style={{ padding: '1em', ...style }}>
      <Flex align="center" gap="small">
        <Text type="text1">{templateName}</Text>
        {!readOnly && (
          <Pencil
            onClick={() => setModalOpen(true)}
            style={{ cursor: 'pointer' }}
            color={theme === 'light' ? 'black' : 'white'}
            size={16}
          />
        )}
        <Text type="text2" style={{ marginLeft: '1em' }}>
          Category:
        </Text>
        <div style={{ width: '10em' }}>
          <Dropdown
            clearable={false}
            isOptionSelected={(option) => option.value === selectedCategory}
            value={categories.find((c) => c.value === selectedCategory)}
            options={categories}
            onChange={(selected) =>
              !readOnly && setSelectedCategory(selected.value)
            }
            disabled={readOnly}
          />
        </div>
      </Flex>

      <Modal
        show={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Edit Template Name"
      >
        <ModalHeader title="Edit Template Name" />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('name', {
                required: 'Name is required',
                pattern: {
                  value: /^[a-zA-Z-_]+$/,
                  message:
                    'Name can only contain letters, hyphens, and underscores',
                },
              })}
              onChange={(val) => setValue('name', val)}
              disabled={readOnly}
            />
            <Text type="text2" style={{ color: 'red' }}>
              {formErrors.name?.message}
            </Text>
          </form>
        </ModalContent>
        <ModalFooter>
          <Flex gap="small">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || readOnly}
            >
              Save
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </Flex>
        </ModalFooter>
      </Modal>
    </Flex>
  );
};
