import { Meta, StoryObj } from '@storybook/react';
import { UsernamePasswordForm } from '.';
import { LoginType } from '../../templates/login-template';

const meta: Meta<typeof UsernamePasswordForm> = {
  component: UsernamePasswordForm,
  argTypes: {},
  args: {
    onSubmit(username: string, password: string) {
      console.log({
        username,
        password,
      });
    },
  },
};

export default meta;
type Story = StoryObj<typeof UsernamePasswordForm>;

export const SignIn: Story = {
  args: {
    loginType: LoginType.SIGN_IN,
  },
};
export const SignUp: Story = {
  args: {
    loginType: LoginType.SIGN_UP,
  },
};
