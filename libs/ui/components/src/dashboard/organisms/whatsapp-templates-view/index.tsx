'use client';

import {
  NEW_WHATSAPP_TEMPLATE_ID,
  WhatsappTemplate,
  WhatsappTemplatesViewProps,
} from '@vibe-chat/shared-types';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from '@vibe/core';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { CSSProperties, FC, useState } from 'react';
type Props = WhatsappTemplatesViewProps & {
  style?: CSSProperties;
};

export const WhatsappTemplatesView: FC<Props> = ({ style, listProps }) => {
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        <TemplatesList {...listProps} />
      </div>
    </>
  );
};

type TemplatesListProps = {
  templates: WhatsappTemplate[];
  onDeleteTemplate: (template: WhatsappTemplate) => void;
  onDeleteMultipleTemplates: (templates: WhatsappTemplate[]) => void;
  pendingDelete?: boolean;
};

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

const DeleteConfirmationModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader title={title} />
      <ModalContent>
        <Text type="text1">{message}</Text>
      </ModalContent>
      <ModalFooter>
        <Flex gap="small">
          <Button onClick={onConfirm} kind="primary">
            Delete
          </Button>
          <Button onClick={onClose} kind="secondary">
            Cancel
          </Button>
        </Flex>
      </ModalFooter>
    </Modal>
  );
};

function TemplatesList({
  templates,
  onDeleteTemplate,
  onDeleteMultipleTemplates,
  pendingDelete,
}: TemplatesListProps) {
  const t = useTranslations('WhatsappTemplatesView');

  const columns = [
    {
      id: 'check',
      title: '',
    },
    {
      id: 'name',
      title: t('columns.name'),
    },
    {
      id: 'category',
      title: t('columns.category'),
    },
    {
      id: 'language',
      title: t('columns.language'),
    },
    {
      id: 'status',
      title: t('columns.status'),
    },
    {
      id: 'options',
      title: '',
    },
  ];

  const dataSource = templates.map((template) => ({
    id: template.id,
    name: template.name,
    category: template.category,
    language: template.language,
    status: template.status,
    draft: template.isDraft ? t('yes') : undefined,
  }));

  console.log({
    templates,
    dataSource,
  });

  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [singleDeleteTemplate, setSingleDeleteTemplate] =
    useState<WhatsappTemplate | null>(null);
  const [showMultiDeleteModal, setShowMultiDeleteModal] = useState(false);

  const handleDeleteSelected = () => {
    const templatesForDeletion = templates.filter((t) =>
      selectedTemplates.includes(t.id)
    );
    onDeleteMultipleTemplates(templatesForDeletion);
    setSelectedTemplates([]);
    setShowMultiDeleteModal(false);
  };

  const { subscriptionId } = useParams();

  return (
    <>
      <div style={{ padding: '1em' }}>
        <Box marginBottom="medium">
          <Flex justify="space-between">
            <Heading type="h2">{t('title')}</Heading>
            <Flex gap="small">
              {selectedTemplates.length > 0 && (
                <Button
                  size="medium"
                  kind="primary"
                  onClick={() => setShowMultiDeleteModal(true)}
                  disabled={pendingDelete}
                >
                  <Trash2 size={16} />
                  {t('deleteSelected', { count: selectedTemplates.length })}
                </Button>
              )}
              <Link
                href={`/dashboard/${subscriptionId}/integration/whatsapp/template/${NEW_WHATSAPP_TEMPLATE_ID}`}
              >
                <Button
                  size="medium"
                  kind="primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  disabled={pendingDelete}
                >
                  <Plus size={16} />
                  <span>{t('createTemplate')}</span>
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Box>
        <Table
          style={{
            width: 'auto',
          }}
          size="small"
          errorState={<TableErrorState />}
          emptyState={<TableEmptyState />}
          columns={columns}
        >
          <TableHeader>
            {columns.map((headerCell, index) => (
              <TableHeaderCell key={index} title={headerCell.title} />
            ))}
          </TableHeader>
          <TableBody>
            {dataSource.map((rowItem) => (
              <TableRow
                highlighted={selectedTemplates.includes(rowItem.id)}
                key={rowItem.id}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedTemplates.includes(rowItem.id)}
                    onChange={(e) => {
                      setSelectedTemplates(
                        e.target.checked
                          ? [...selectedTemplates, rowItem.id]
                          : selectedTemplates.filter((id) => id !== rowItem.id)
                      );
                    }}
                  />
                </TableCell>
                <TableCell>{rowItem.name}</TableCell>
                <TableCell>{rowItem.category}</TableCell>
                <TableCell>{rowItem.language}</TableCell>
                <TableCell>
                  {rowItem.draft ? t('columns.draft') : rowItem.status}
                </TableCell>
                <TableCell>
                  <Flex gap="small">
                    <Link
                      href={`/dashboard/${subscriptionId}/integration/whatsapp/template/${rowItem.name}`}
                    >
                      <Button size="small" kind="secondary">
                        <Pencil size={16} />
                      </Button>
                    </Link>
                    <Button
                      size="small"
                      kind="secondary"
                      loading={pendingDelete}
                      onClick={() => {
                        const template = templates.find(
                          (t) => t.id === rowItem.id
                        )!;
                        setSingleDeleteTemplate(template);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmationModal
        isOpen={!!singleDeleteTemplate}
        onClose={() => setSingleDeleteTemplate(null)}
        onConfirm={() => {
          if (singleDeleteTemplate) {
            onDeleteTemplate(singleDeleteTemplate);
            setSingleDeleteTemplate(null);
          }
        }}
        title={t('deleteTemplate')}
        message={t('deleteTemplateConfirmation', {
          name: singleDeleteTemplate?.name,
        })}
      />

      <DeleteConfirmationModal
        isOpen={showMultiDeleteModal}
        onClose={() => setShowMultiDeleteModal(false)}
        onConfirm={handleDeleteSelected}
        title={t('deleteMultipleTemplates')}
        message={t('deleteMultipleTemplatesConfirmation', {
          count: selectedTemplates.length,
        })}
      />
    </>
  );
}

const TableErrorState: React.FC = () => (
  <Box padding="medium">Error loading data.</Box>
);

const TableEmptyState: React.FC = () => (
  <Box padding="medium">No templates available.</Box>
);
