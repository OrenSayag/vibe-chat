import { CSSProperties, FC } from 'react';

type Props = {
  style?: CSSProperties;
};

export const WhatsappTemplatesView: FC<Props> = ({ style = {} }) => {
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        WhatsappTemplatesView works!
      </div>
    </>
  );
};
