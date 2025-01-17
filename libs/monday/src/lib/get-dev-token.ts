export const getDevToken = () => {
  if (process.env['NODE_ENV'] === 'production') {
    return undefined;
  }
  return (
    process.env['DEV_API_TOKEN'] ?? process.env['NEXT_PUBLIC_DEV_API_TOKEN']
  );
};
