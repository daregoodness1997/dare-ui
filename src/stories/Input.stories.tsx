import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Input } from '../components/input';

export default {
  title: 'Example/Input',
  component: Input,

  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = args => (
  <div
    style={{
      backgroundColor: '#fefefe',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <div style={{ width: '400px' }}>
      <Input {...args} />
    </div>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  label: 'Search',
};
export const Warning = Template.bind({});
Warning.args = {
  state: 'warning',
};
export const Error = Template.bind({});
Error.args = {
  state: 'error',
};
