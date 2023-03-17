import React, { SyntheticEvent, useState } from 'react';
import './styles.css';
import { motion } from 'framer-motion';
import { columnSchema } from '../../utils/data';

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
        <motion.tr onClick={onRowClicked}>
          <motion.td
            onClick={() => toggleExpand(item.id)}
            className='tree-grid-first'
          >
            <input type='checkbox' onClick={onCheckboxSelected} />

            {rowExpanded.includes(item.id) ? '-' : '+'}
          </motion.td>
          {columnSchema.map(column => (
            <motion.td>{item[column.row]}</motion.td>
          ))}
        </motion.tr>
        {rowExpanded.includes(item.id) && item.children && (
          <motion.tr>
            <motion.td colSpan={columnSchema.length + 1}>
              {/* {RenderTableRows(item.children, onCheckboxSelected, onRowClicked)} */}
              <motion.table className='tree-grid-child '>
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
        {columns ? (
          <motion.thead>
            <motion.tr>
              <motion.th className='tree-grid-first'></motion.th>

              {columnSchema.map(column => (
                <motion.th>{column.selector}</motion.th>
              ))}
            </motion.tr>
          </motion.thead>
        ) : null}

        <motion.tbody>{RenderTableRows(data, onCheckboxSelected)}</motion.tbody>
      </motion.table>
    </motion.div>
  );
};
