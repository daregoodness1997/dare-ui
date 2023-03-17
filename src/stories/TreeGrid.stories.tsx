import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TreeGrid } from '../components/tree-grid';
import { data } from '../utils/data';

export default {
  title: 'Example/TreeGrid',
  component: TreeGrid,

  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof TreeGrid>;

const Template: StoryFn<typeof TreeGrid> = args => <TreeGrid {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  data: data,
  title: 'TreeGrid',
};
