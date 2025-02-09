import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@vibe/core';
import {
  WhatsappTemplate,
  WhatsappTemplatesViewProps,
} from '@vibe-chat/shared-types';
import { Pencil, Trash2 } from 'lucide-react';
import React, { CSSProperties, FC, useState } from 'react';
import { useTranslations } from 'next-intl';
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
  onCreateTemplate: () => void;
  onEditTemplate: (template: WhatsappTemplate) => void;
  onDeleteTemplate: (template: WhatsappTemplate) => void;
};

function TemplatesList({
  templates,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate,
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
  }));

  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  return (
    <>
      <div style={{ padding: '1em' }}>
        <Box marginBottom="medium">
          <Flex justify="space-between">
            <Heading type="h2">{t('title')}</Heading>
            <Button size="medium" onClick={onCreateTemplate}>
              {t('createTemplate')}
            </Button>
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
              <TableRow highlighted={selectedTemplates.includes(rowItem.id)}>
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
                <TableCell>{rowItem.status}</TableCell>
                <TableCell>
                  <Flex gap="small">
                    <Button
                      size="small"
                      kind="secondary"
                      onClick={() =>
                        onEditTemplate(
                          templates.find((t) => t.id === rowItem.id)!
                        )
                      }
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="small"
                      kind="secondary"
                      onClick={() =>
                        onDeleteTemplate(
                          templates.find((t) => t.id === rowItem.id)!
                        )
                      }
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
    </>
  );
}

const TableErrorState: React.FC = () => (
  <Box padding="medium">Error loading data.</Box>
);

const TableEmptyState: React.FC = () => (
  <Box padding="medium">No templates available.</Box>
);
