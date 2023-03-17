import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TreeGrid } from '../components/tree-grid';
import { data } from '../utils/data';

export default {
  title: 'Example/TreeGrid',
  component: TreeGrid,

  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TreeGrid>;

const Template: ComponentStory<typeof TreeGrid> = args => (
  <TreeGrid {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  data: data,
  title: 'TreeGrid',
};
