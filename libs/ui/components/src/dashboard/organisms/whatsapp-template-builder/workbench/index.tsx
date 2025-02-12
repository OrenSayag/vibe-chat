import { Divider } from '@vibe/core';
import { FC } from 'react';
import { Content } from './content';
import { Header } from './header';
import { Locales } from './locales';
import { Preview } from './preview';
import { TemplateBuilderWorkbenchProps } from '@vibe-chat/shared-types';

export const Workbench: FC<TemplateBuilderWorkbenchProps> = ({
  style = {},
  categories,
  template,
  localesProps,
  contentProps,
  headerProps,
  formData,
}) => {
  return (
    <>
      <div
        style={{
          ...style,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header
          templateName={headerProps.templateName}
          selectedCategory={headerProps.selectedCategory}
          setSelectedCategory={headerProps.setSelectedCategory}
          onNameChange={headerProps.onNameChange}
          categories={categories}
          errors={headerProps.errors || {}}
        />
        <Divider withoutMargin />
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(12, 1fr)',
            gridTemplateColumns: '3fr 6fr 3fr',
            flexGrow: 1,
          }}
        >
          <Locales
            style={{
              gridColumn: '1 / 2',
              height: '100%',
              gridRow: '1 / 13',
            }}
            {...localesProps}
          />
          <div
            style={{
              gridColumn: '2 / 3',
              height: '100%',
              gridRow: '1 / 13',
              padding: '0 .3em',
            }}
          >
            <Content {...contentProps} />
          </div>
          <div
            style={{
              gridColumn: '3 / 4',
              height: '100%',
              gridRow: '1 / 13',
            }}
          >
            <Preview data={formData} />
          </div>
        </div>
      </div>
    </>
  );
};
