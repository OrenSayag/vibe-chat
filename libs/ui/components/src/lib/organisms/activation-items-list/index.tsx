import { FC } from 'react';
import { ListItem } from '@monday-whatsapp/shared-types';
import {
  Box,
  Button,
  ButtonColor,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from '@vibe/core';
import { cn } from '@monday-whatsapp/utils';
import { format, isThisYear, isToday } from 'date-fns';

export type DeactivatedItem = ListItem<{
  id: string;
}>;

export type ActivatedItem = ListItem<{
  activationDate: string;
  id: string;
}>;

interface Props {
  className?: string;
  activatedItems: ActivatedItem[];
  deactivatedItems: DeactivatedItem[];
}

export const ActivationItemsList: FC<Props> = ({
  className,
  deactivatedItems,
  activatedItems,
}) => {
  return (
    <>
      <Box className={cn(className)}>
        <List items={activatedItems} type={ActivationListType.ACTIVATED} />
        <List items={deactivatedItems} type={ActivationListType.DEACTIVATED} />
      </Box>
    </>
  );
};

enum ActivationListType {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated',
}

const lablesMap: Record<
  ActivationListType,
  {
    title: string;
    activationButtonLabel: string;
    activationButtonColor: ButtonColor;
  }
> = {
  activated: {
    title: 'Activated',
    activationButtonLabel: 'Deactivate',
    activationButtonColor: 'negative',
  },
  deactivated: {
    title: 'Deactivated',
    activationButtonLabel: 'Activate',
    activationButtonColor: 'positive',
  },
};

function List({
  items,
  className,
  type,
}:
  | {
      className?: string;
      items: ActivatedItem[];
      type: ActivationListType.ACTIVATED;
    }
  | {
      className?: string;
      items: DeactivatedItem[];
      type: ActivationListType.DEACTIVATED;
    }) {
  return (
    <Box>
      <Heading type={'h3'}>{lablesMap[type].title}</Heading>
      <Table
        className={cn(className)}
        columns={[
          {
            id: 'name',
            loadingStateType: 'long-text',
            title: 'Name',
          },
          {
            id: 'activation',
            title: 'activation',
          },
          {
            id: 'activationDate',
            loadingStateType: 'medium-text',
            title:
              type === ActivationListType.ACTIVATED ? 'Activation Date' : '',
            width: 150,
          },
        ]}
        emptyState={
          <Box padding={'small'}>
            <Text>Empty</Text>
          </Box>
        }
        errorState={
          <Box padding={'small'}>
            <Text>Error</Text>
          </Box>
        }
      >
        <TableHeader>
          <TableHeaderCell title="Name" />
          <TableHeaderCell title={''} />
          <TableHeaderCell
            title={
              type === ActivationListType.ACTIVATED ? 'Activation Date' : ''
            }
          />
        </TableHeader>
        <TableBody>
          {items.map((it) => (
            <TableRow>
              <TableCell>{it.label}</TableCell>
              <TableCell>
                <Button
                  size={'xs'}
                  color={lablesMap[type].activationButtonColor}
                >
                  {lablesMap[type].activationButtonLabel}
                </Button>
              </TableCell>
              <TableCell key={it.value.id}>
                {type === ActivationListType.ACTIVATED && (
                  <Text>
                    {isToday(it.value.activationDate)
                      ? 'Today'
                      : isThisYear(it.value.activationDate)
                      ? format(it.value.activationDate, 'dd/MM')
                      : format(it.value.activationDate, 'dd/MM/yyyy')}
                  </Text>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
