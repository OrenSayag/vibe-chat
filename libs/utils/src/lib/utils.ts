export const phoneNumberToGreenChatId = (phoneNumber: string) =>
  `${phoneNumber}@c.us`;

export function greenChatIdToPhoneNumber(input: string): string {
  const match = input.match(/^(\d+)@c\.us$/);
  if (match && match[1]) {
    const phoneNumber = match[1];
    return formatAsPhoneNumber(phoneNumber);
  }
  throw new Error('Invalid input format');

  function formatAsPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length === 12) {
      return `+${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        5
      )}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`;
    }
    return phoneNumber;
  }
}
