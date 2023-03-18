import React, { SyntheticEvent, useState } from 'react';
import './styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { columnSchema } from '../../utils/data';
import { Input } from '../input';
import { viewAnimation, container } from '../../utils/animation';
import useMeasure from 'react-use-measure';
import TableRow from './components/TableRow';

export type DataType = {
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
  onRowClicked: (data?: SyntheticEvent) => void;
  title?: string;
  columns?: ColumnType[];
  customStyle: {};
  onCheckboxSelected: (data?: SyntheticEvent) => void;
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

  return (
    <AnimatePresence mode='popLayout'>
      <motion.h2>{title}</motion.h2>
      {hasSearch ? <Input /> : null}
      <motion.div
        className='tree-grid'
        variants={viewAnimation}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {columns ? (
          <motion.div>
            <motion.div className='tree-row head'>
              <motion.div className='tree-grid-first'></motion.div>

              <div className='tree-col'>
                {columnSchema.map(column => (
                  <motion.div className='tree-row-item'>
                    {column.selector}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}

        <motion.div variants={container} initial='hidden' animate='show'>
          {TableRow(
            data,
            onCheckboxSelected,
            onRowClicked,
            toggleExpand,
            columnSchema,
            rowExpanded
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
