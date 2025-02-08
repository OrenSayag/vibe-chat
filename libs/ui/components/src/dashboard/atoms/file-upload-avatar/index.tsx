import { CSSProperties, FC, useEffect, useRef } from 'react';

type Props = {
  imageSrc?: string;
  style?: CSSProperties;
  onChange(file: File): void;
};

export const FileUploadAvatar: FC<Props> = ({ imageSrc, onChange, style }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.match(/^image\/(jpeg|png|gif|bmp|webp)$/)) {
        onChange(file);
      }
    }
  };

  useEffect(() => {
    if (!imageSrc && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [imageSrc]);

  return (
    <span
      style={{
        cursor: 'pointer',
        display: 'flex',
        width: '10em',
        height: '10em',
        borderRadius: '50%',
        background: 'rgba(56,179,86,0.7)',
        ...style,
      }}
      onClick={handleAvatarClick}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={''}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '50%',
          }}
        />
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/bmp,image/webp"
      />
    </span>
  );
};
