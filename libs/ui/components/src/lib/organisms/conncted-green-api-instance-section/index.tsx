import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { GreenApiInstanceStatus } from '@monday-whatsapp/shared-types';
import { Box, Heading, Loader, Text } from '@vibe/core';
import { Button } from '@monday-whatsapp/components';
import Image from 'next/image';

interface Props {
  className?: string;
  status: GreenApiInstanceStatus;
  phoneNumber?: string;
  qrCode?: string;
  onDisconnectWhatsapp(): void;
  pendingDisconnect?: boolean;
  pendingQr?: boolean;
}

export const ConnectedGreenApiInstance: FC<Props> = ({
  className,
  status,
  phoneNumber,
  qrCode,
  onDisconnectWhatsapp,
  pendingDisconnect,
  pendingQr,
}) => {
  return (
    <>
      <Box
        className={cn(className)}
        border={true}
        padding={'medium'}
        rounded={'medium'}
      >
        {status === GreenApiInstanceStatus.STARTING && (
          <Text>Starting connection...</Text>
        )}
        {status === GreenApiInstanceStatus.CONNECTED && (
          <Connected
            onDisconnectWhatsapp={onDisconnectWhatsapp}
            pendingDisconnect={pendingDisconnect}
            phoneNumber={phoneNumber}
          />
        )}
        {status === GreenApiInstanceStatus.NOT_CONNECTED && (
          <ConnectPrompt pendingQr={pendingQr} qrCode={qrCode} />
        )}
        {(status === GreenApiInstanceStatus.INVALID_GREEN_API_INSTANCE_INFO ||
          status ===
            GreenApiInstanceStatus.MISSING_GREEN_API_INSTANCE_INFO) && (
          <InvalidGreenApiData />
        )}
        {status === GreenApiInstanceStatus.BLOCKED && <Blocked />}
        {status === GreenApiInstanceStatus.SLEEP_MODE && <SleepMode />}
        {status === GreenApiInstanceStatus.YELLOW_CARD && <YellowCard />}
      </Box>
    </>
  );
};

function ConnectPrompt({
  className,
  qrCode,
  pendingQr,
}: {
  className?: string;
  qrCode?: string;
  pendingQr?: boolean;
}) {
  return (
    <Box className={cn(className)}>
      <Heading type={'h3'}>You are not connected to WhatsApp.</Heading>
      <Box>
        {!qrCode && pendingQr && (
          <Box>
            <Text>Loading QR code...</Text>
          </Box>
        )}
        {qrCode && (
          <Image
            src={`data:image/png;base64,${qrCode}`}
            alt={'qr-code'}
            width={150}
            height={150}
          />
        )}
      </Box>
    </Box>
  );
}

function Connected({
  className,
  onDisconnectWhatsapp,
  phoneNumber,
  pendingDisconnect,
}: {
  className?: string;
  phoneNumber?: string;
  onDisconnectWhatsapp(): void;
  pendingDisconnect?: boolean;
}) {
  return (
    <Box className={cn(className)}>
      <Heading type={'h3'}>You are connected to WhatsApp.</Heading>
      {phoneNumber && <Text>Phone number: {phoneNumber}</Text>}
      <Button
        onClick={onDisconnectWhatsapp}
        size={'xs'}
        loading={pendingDisconnect}
        color={'negative'}
      >
        Disconnect WhatsApp
      </Button>
    </Box>
  );
}

function InvalidGreenApiData({ className }: { className?: string }) {
  return (
    <Box className={cn(className)}>
      <Heading type={'h3'}>Invalid account configuration.</Heading>
      <Text>Please contact us</Text>
    </Box>
  );
}

function Blocked() {
  return (
    <Box>
      <Text>Your WhatsApp account is blocked.</Text>
    </Box>
  );
}

function SleepMode() {
  return (
    <Box>
      <Text>
        Sleep mode - Please connect your phone to WhatsApp. After, it will take
        up to 5 minutes to connect again.
      </Text>
    </Box>
  );
}

function YellowCard() {
  return (
    <Box>
      <Text>Yellow Card</Text>
    </Box>
  );
}
