import { Divider } from '@vibe/core';
import { FC } from 'react';
import { Content } from './content';
import { Header } from './header';
import { Locales } from './locales';
import { Preview } from './preview';
import { WhatappTemplateBuilderWorkbenchProps } from '@vibe-chat/shared-types';

export const Workbench: FC<WhatappTemplateBuilderWorkbenchProps> = ({
  style = {},
  categories,
  localesProps,
  contentProps,
  headerProps,
  previewData,
  isReadOnly,
}) => {
  return (
    <>
      <div
        style={{
          ...style,
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
          readOnly={isReadOnly}
        />
        <Divider withoutMargin />
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(12, 1fr)',
            gridTemplateColumns: '3fr 6fr 3fr',
            flexGrow: 1,
            maxHeight: '100%',
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
              overflowY: 'scroll',
            }}
          >
            <Content
              {...contentProps}
              style={{
                height: '100%',
                maxHeight: '100%',
                overflowY: 'scroll',
              }}
            />
          </div>
          <div
            style={{
              gridColumn: '3 / 4',
              height: '100%',
              gridRow: '1 / 13',
            }}
          >
            <Preview data={previewData} />
          </div>
        </div>
      </div>
    </>
  );
};
