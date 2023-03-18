import React, { SyntheticEvent, useState } from 'react';
import './styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { columnSchema } from '../../utils/data';
import { Input } from '../input';
import { viewAnimation, container } from '../../utils/animation';
import useMeasure from 'react-use-measure';
import TableRow from './components/TableRow';
import Spinner from '../spinner';

export type DataType = {
  id: number;
  children?: Array<DataType>;
  [key: string]: any;
};

type ColumnType = {
  [key: string]: any;
};

export type CustomStyleType = {
  tableStyles?: {};
  tableHeadStyles?: {};
  tableBodyStyles?: {};
  tableCellStyles?: {};
};

interface Props {
  data: DataType[];
  size?: 'small' | 'medium' | 'large';
  condensed?: boolean;
  onRowClicked: (data?: DataType) => {};
  title?: string;
  columns?: ColumnType[];
  customStyle: CustomStyleType;
  onCheckboxSelected: (data?: SyntheticEvent) => void;
  hasSearch?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
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
  isLoading,
  isEmpty,
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
        className={`tree-grid ${condensed ? 'condensed' : null}`}
        variants={viewAnimation}
        initial='hidden'
        animate='visible'
        exit='exit'
        style={customStyle?.tableStyles}
      >
        {columns ? (
          <motion.div>
            <motion.div
              className='tree-row head'
              style={customStyle?.tableHeadStyles}
            >
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
          {isLoading ? (
            <Spinner />
          ) : isEmpty ? (
            <div>isEmpty</div>
          ) : (
            <React.Fragment>
              {TableRow(
                data,
                onCheckboxSelected,
                onRowClicked,
                toggleExpand,
                columnSchema,
                rowExpanded,
                customStyle
              )}
            </React.Fragment>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
