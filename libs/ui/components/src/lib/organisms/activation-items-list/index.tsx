import { FC } from 'react';
import { ActivatedItem, DeactivatedItem } from '@monday-whatsapp/shared-types';
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

interface Props {
  className?: string;
  activatedItems: ActivatedItem[];
  deactivatedItems: DeactivatedItem[];
  onToggleActivation(itemId: string): void;
  pendingToggleActivation?: boolean;
}

export const ActivationItemsList: FC<Props> = ({
  className,
  deactivatedItems,
  activatedItems,
  onToggleActivation,
  pendingToggleActivation,
}) => {
  return (
    <>
      <Box className={cn(className)}>
        <Box marginY={'small'}>
          <List
            items={activatedItems}
            type={ActivationListType.ACTIVATED}
            onToggleActivation={onToggleActivation}
            pendingToggleActivation={pendingToggleActivation}
          />
        </Box>
        <Box marginY={'small'}>
          <List
            items={deactivatedItems}
            type={ActivationListType.DEACTIVATED}
            onToggleActivation={onToggleActivation}
            pendingToggleActivation={pendingToggleActivation}
          />
        </Box>
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
  onToggleActivation,
  pendingToggleActivation,
}: (
  | {
      className?: string;
      items: ActivatedItem[];
      type: ActivationListType.ACTIVATED;
    }
  | {
      className?: string;
      items: DeactivatedItem[];
      type: ActivationListType.DEACTIVATED;
    }
) & {
  onToggleActivation(itemId: string): void;
  pendingToggleActivation?: boolean;
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
                  onClick={() => onToggleActivation(it.value.id)}
                  size={'xs'}
                  color={lablesMap[type].activationButtonColor}
                  disabled={pendingToggleActivation}
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
