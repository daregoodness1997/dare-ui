import React, { SyntheticEvent, useState } from 'react';
import './styles.css';
import { motion } from 'framer-motion';
import { columnSchema } from '../../utils/data';
import { Input } from '../input';

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
    onCheckboxSelected?: (data?: SyntheticEvent) => void,
    onRowClicked?: (data?: SyntheticEvent) => void
  ) => {
    return data.map(item => (
      <React.Fragment key={item.id}>
        <motion.div onClick={onRowClicked} className='tree-row body'>
          <motion.div
            onClick={() => toggleExpand(item.id)}
            className='tree-grid-first'
          >
            <input type='checkbox' onClick={onCheckboxSelected} />

            {rowExpanded.includes(item.id) ? '-' : '+'}
          </motion.div>
          {columnSchema.map(column => (
            <motion.div className='tree-row-item'>
              {item[column.row]}
            </motion.div>
          ))}
        </motion.div>
        {rowExpanded.includes(item.id) && item.children && (
          <motion.div>
            <motion.div
            // colSpan={columnSchema.length + 1}
            >
              {/* {RenderTableRows(item.children, onCheckboxSelected, onRowClicked)} */}
              <motion.div className='tree-grid-child '>
                <motion.div>
                  {RenderTableRows(item.children, onCheckboxSelected)}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <motion.div>
      <motion.h2>{title}</motion.h2>
      {hasSearch ? <Input /> : null}
      <motion.div className='tree-grid'>
        {columns ? (
          <motion.div>
            <motion.div className='tree-row head'>
              <motion.div className='tree-grid-first'></motion.div>

              {columnSchema.map(column => (
                <motion.div className='tree-row-item'>
                  {column.selector}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : null}

        <motion.div>{RenderTableRows(data, onCheckboxSelected)}</motion.div>
      </motion.div>
    </motion.div>
  );
};
