import React, { SyntheticEvent, useState } from 'react';
import { CustomStyleType, DataType } from '..';
import { motion } from 'framer-motion';
import { viewAnimation } from '../../../utils/animation';
import { ColumnType } from '../../../utils/data';
import { CaretDownIcon, CaretUpIcon } from '../../icons';

const TableRow = (
  data: DataType[],
  onCheckboxSelected: (data?: SyntheticEvent) => void,
  onRowClicked: (data?: DataType) => {},
  toggleExpand: (data: number) => void,
  columnSchema: ColumnType[],
  rowExpanded: number[],
  customStyle: CustomStyleType
) => {
  return data.map(item => {
    let parentChecked = false;
    const onParentChanged = () => {
      if (parentChecked) return false;
      return true;
    };

    let width = '40px';

    return (
      <motion.div
        key={item.id}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
      >
        <motion.div
          onClick={item => onRowClicked()}
          className='tree-row body'
          variants={viewAnimation}
          initial='hidden'
          animate='visible'
          exit='exit'
          style={customStyle?.tableBodyStyles}
        >
          <motion.div
            onClick={() => toggleExpand(item.id)}
            className='tree-grid-first'
            style={{ width: width }}
          >
            <input
              type='checkbox'
              onClick={() => {
                onParentChanged();
                onCheckboxSelected();
              }}
              defaultChecked={parentChecked}
            />
            {item.children ? (
              <>
                {rowExpanded.includes(item.id) ? (
                  <CaretUpIcon />
                ) : (
                  <CaretDownIcon />
                )}
              </>
            ) : null}
          </motion.div>
          <div className='tree-col'>
            {columnSchema.map(column => (
              <motion.div className='tree-row-item'>
                {item[column.row]}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {rowExpanded.includes(item.id) && item.children && (
          <motion.div
            variants={viewAnimation}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <motion.div>
              <motion.div className='tree-grid-child '>
                <motion.div>
                  {TableRow(
                    item.children,
                    onCheckboxSelected,
                    onRowClicked,
                    toggleExpand,
                    columnSchema,
                    rowExpanded,
                    customStyle
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    );
  });
};

export default TableRow;
