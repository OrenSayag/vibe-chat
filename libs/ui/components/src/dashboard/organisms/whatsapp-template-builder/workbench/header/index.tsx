import {
  ListItem as IListItem,
  WhatsappTemplateBuilderForm,
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
import { CSSProperties, FC, useEffect, useState } from 'react';
import { FieldErrors } from 'react-hook-form';

type Props = {
  style?: CSSProperties;
  templateName: string;
  selectedCategory: WhatsappTemplateCategory;
  setSelectedCategory: (category: WhatsappTemplateCategory) => void;
  categories: IListItem<WhatsappTemplateCategory>[];
  errors: FieldErrors<WhatsappTemplateBuilderForm>;
  onNameChange: (name: string) => void;
};

export const Header: FC<Props> = ({
  style = {},
  templateName,
  selectedCategory,
  setSelectedCategory,
  categories,
  errors,
  onNameChange,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(templateName);

  return (
    <Flex justify="space-between" style={{ padding: '1em', ...style }}>
      <Flex align="center" gap="small">
        <Text type="text1">{templateName}</Text>
        <Pencil
          onClick={() => setModalOpen(true)}
          style={{ cursor: 'pointer' }}
          size={16}
        />
        <Text type="text2" style={{ marginLeft: '1em' }}>
          Category:
        </Text>
        <div style={{ width: '10em' }}>
          <Dropdown
            clearable={false}
            isOptionSelected={(option) => option.value === selectedCategory}
            value={categories.find((c) => c.value === selectedCategory)}
            options={categories}
            onChange={(selected) => setSelectedCategory(selected.value)}
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
          <>
            <TextField value={name} onChange={(value) => setName(value)} />
            <Text type="text2" style={{ color: 'red' }}>
              {errors.name?.message}
            </Text>
          </>
        </ModalContent>
        <ModalFooter>
          <Flex gap="small">
            <Button
              onClick={() => {
                onNameChange(name);
                setModalOpen(false);
              }}
              disabled={!name}
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
