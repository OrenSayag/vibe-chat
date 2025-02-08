import '@vibe/core/tokens';
import './global.css';
import { Preview } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import { i18nStorybookMessagesEn } from '../src/dashboard/assets/i18n-storybook/en';
import { createElement } from 'react';

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      return createElement(NextIntlClientProvider, {
        locale: 'en',
        messages: i18nStorybookMessagesEn,
        children: createElement(Story),
      });
    },
  ],
};

export default preview;
