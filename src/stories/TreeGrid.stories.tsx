import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TreeGrid } from '../components/tree-grid';
import { columnSchema, data } from '../utils/data';

export default {
  title: 'Example/TreeGrid',
  component: TreeGrid,

  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof TreeGrid>;

const Template: StoryFn<typeof TreeGrid> = args => (
  <div
    style={{
      backgroundColor: '#fefefe',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <div style={{ width: '800px' }}>
      <TreeGrid {...args} />
    </div>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  data: data,
  title: 'User Data',
  columns: columnSchema,
  onCheckboxSelected: () => console.log('checked'),
};
