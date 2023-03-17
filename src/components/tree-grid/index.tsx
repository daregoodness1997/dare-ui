import React, { SyntheticEvent, useState } from 'react';
import './styles.css';
import { motion } from 'framer-motion';

type DataType = {
  id: number;
  children?: Array<DataType>;
  [key: string]: any;
};

type ColumnType = {
  [key: string]: any;
};

interface Props {
  data: DataType[];
  size?: 'small' | 'medium' | 'large';
  condensed?: boolean;
  onRowClicked?: (data?: SyntheticEvent) => void;
  title?: string;
  columns?: ColumnType[];
  customStyle: {};
  onCheckboxSelected?: (data?: SyntheticEvent) => void;
  hasSearch?: boolean;
}

export const TreeGrid: React.FC<Props> = ({
  data,
  onCheckboxSelected,
  condensed,
  size,
  onRowClicked,
  title,
  columns,
  customStyle,
  hasSearch,
}) => {
  const [rowExpanded, setRowExpanded] = useState<number[]>([]);
  const toggleExpand = (id: number) => {
    if (rowExpanded.includes(id)) {
      setRowExpanded(prevExpanded =>
        prevExpanded.filter(itemId => itemId !== id)
      );
    } else {
      setRowExpanded(prevExpanded => [...prevExpanded, id]);
    }
  };

  const RenderTableRows = (
    data: DataType[],
    onCheckboxSelected?: (data?: SyntheticEvent) => void
  ) => {
    return data.map(item => (
      <React.Fragment key={item.id}>
        <motion.tr onClick={onRowClicked} layout>
          <motion.td
            onClick={() => toggleExpand(item.id)}
            className='tree-grid-first'
          >
            <input type='checkbox' onClick={onCheckboxSelected} />

            {rowExpanded.includes(item.id) ? '-' : '+'}
          </motion.td>
          <motion.td>{item.name}</motion.td>
          <motion.td>{item.age}</motion.td>
          <motion.td>{item.location}</motion.td>
        </motion.tr>
        {rowExpanded.includes(item.id) && item.children && (
          <motion.tr layout>
            <motion.td colSpan={3}>
              <motion.table className='tree-grid-child'>
                <motion.tbody>
                  {RenderTableRows(item.children, onCheckboxSelected)}
                </motion.tbody>
              </motion.table>
            </motion.td>
          </motion.tr>
        )}
      </React.Fragment>
    ));
  };

  return (
    <motion.div>
      <motion.h2>{title}</motion.h2>
      {hasSearch ? <input /> : null}
      <motion.table className='tree-grid'>
        <motion.thead>
          <motion.tr layout>
            <motion.th className='tree-grid-first'></motion.th>
            <motion.th>Name</motion.th>
            <motion.th>Age</motion.th>
            <motion.th>Location</motion.th>
          </motion.tr>
        </motion.thead>
        <motion.tbody>{RenderTableRows(data, onCheckboxSelected)}</motion.tbody>
      </motion.table>
    </motion.div>
  );
};
