import React from 'react';
import Boundary from '../../shared/Boundary';

function assertFC<P>(component: React.FC<P>): asserts component is React.FC<P> {};

type RenderColumnFn<T extends any> = (rowData: T, rowNumber: number, allData: T[]) => any;
type RowProps = {
  children: any | any[],
  id?: string,
  className?: string,
  style?: React.CSSProperties
}
type RenderRow<T extends any> = (columns: (keyof T)[]) =>
  (rowData: T, rowNumber: number, allData: T[]) => RowProps;
type TableContainerProps<T extends any> = {
  items: T[],
  columns: (keyof T)[],
  renderRow: RenderRow<T>
};

const defaultContext: TableContainerProps<any> = {
  items: [],
  columns: [],
  renderRow: columns => (rowData) => ({
    children: columns.map(k => (
      rowData
        ? <Cell key={k.toString()} children={rowData[k]} />
        : <ColumnHead key={k.toString()} children={k.toString()} />
    ))
  } as RowProps)
};
const context = React.createContext(defaultContext);

export const ColumnHead: React.FC<RowProps> = (props) => (
  <th {...props} />
);
export const Cell: React.FC<RowProps> = (props) => (
  <td {...props} />
);

const ZeroState: React.FC<any> = () => (
  <table>
    <tbody>
      <tr>
        <td>
          There are no items to display
        </td>
      </tr>
    </tbody>
  </table>
);
const Table: React.FC<any> = () => {
  const { items, columns, renderRow } = React.useContext(context);
  const render = renderRow(columns);
  return items?.length ? (
    <table>
      <thead>
        <tr {...render(undefined, -1, items)} />
      </thead>
      <tbody>
        { items.map((...args) => (
          <tr key={args[1]} {...render(...args)} />
        )) }
      </tbody>
    </table>
  ) : (
    <ZeroState />
  );
};

function TableContainer<T> (props: TableContainerProps<T>) {
  return (
    <context.Provider value={{ ...defaultContext, ...props }} >
      <Boundary>
        <Table />
      </Boundary>
    </context.Provider>
  );
};
assertFC(TableContainer);

export default TableContainer;