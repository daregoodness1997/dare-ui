import React, { useState } from 'react';

type DataType = {
  id: number;
  children?: Array<DataType>;
  [key: string]: any;
};

interface Props {
  data: DataType[];
}

const TreeGrid: React.FC<Props> = ({ data }) => {
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

  const RenderTableRows = (data: DataType[]) => {
    return data.map(item => (
      <React.Fragment key={item.id}>
        <tr>
          <td onClick={() => toggleExpand(item.id)}>
            {rowExpanded.includes(item.id) ? '-' : '+'}
          </td>
          <td>{item.name}</td>
          <td>{item.value}</td>
        </tr>
        {rowExpanded.includes(item.id) && item.children && (
          <tr>
            <td colSpan={3}>
              <table>
                <tbody>{RenderTableRows(item.children)}</tbody>
              </table>
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{RenderTableRows(data)}</tbody>
    </table>
  );
};

export default TreeGrid;
