import React, { SyntheticEvent, useState } from 'react';
import './styles.css';

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
        <tr onClick={onRowClicked}>
          <td onClick={() => toggleExpand(item.id)} className='tree-grid-first'>
            <input type='checkbox' onClick={onCheckboxSelected} />

            {rowExpanded.includes(item.id) ? '-' : '+'}
          </td>
          <td>{item.value}</td>
        </tr>
        {rowExpanded.includes(item.id) && item.children && (
          <tr className='tree-grid-child'>
            <td colSpan={3}>
              <table>
                <tbody>
                  {RenderTableRows(item.children, onCheckboxSelected)}
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div>
      {hasSearch ? <input /> : null}
      <table className='tree-grid'>
        <thead>
          <tr>
            <th className='tree-grid-first'></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{RenderTableRows(data, onCheckboxSelected)}</tbody>
      </table>
    </div>
  );
};
