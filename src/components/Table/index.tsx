/* eslint-disable no-unused-vars */
import * as React from 'react';
import styled from 'styled-components';

type CellDataRenderer<T> = (row: T, index: number, items: T[]) => string | number | React.ReactElement;
type CellPropsRenderer<T> = (row: T, index: number, items: T[]) => React.HTMLAttributes<HTMLTableCellElement>;
type RowPropsRenderer<T> = (row: T, index: number, items: T[]) => React.HTMLAttributes<HTMLTableRowElement>;
interface ContextType<T> {
  /**
   * list of objects describing data to be displayed
   */
  items: T[];
  columns: (string | CellDataRenderer<T>)[];
  cellProps?: CellPropsRenderer<T>;
  rowProps?: RowPropsRenderer<T>;
}
interface TableProps<T> extends ContextType<T> {
  id?: string;
  className?: string;
  /**
   * custom style for this component
   */
  style?: React.CSSProperties;
}

const TblCtx = React.createContext<ContextType<any>>({
  items: [],
  columns: [],
});

function Table<T>({
  id, className, style, ...props
}: TableProps<T>) {
  return (
    <TblCtx.Provider value={props}>
      <Tbl {...{ id, className, style }}>
        <Header />
        <Body />
      </Tbl>
    </TblCtx.Provider>
  );
}

const Tbl = styled.table.attrs({})`
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.fg};
  width: 100%;
  border-spacing: 4px;
  border-collapse: separate;
  outline: 1px solid ${({ theme }) => theme.colors.grays.jet};
`;
const Td = styled.td.attrs({})`
  /* outline: 1px solid; */
  padding: 0.25em 0.375em;
  text-shadow: ${({ theme }) => theme.textShadow};
`;
const Tr = styled.tr.attrs({})``;
const Tbody = styled.tbody.attrs({})`
  /* outline: 1px solid; */

  ${Tr} {
    &:nth-child(even) {
      ${Td} {
        background-color: ${({ theme }) => theme.colors.grays.jet};
      }
    }
    &:hover {
      outline: 1px solid;
    }
    &:focus-within {
      outline: 2px solid ${({ theme }) => theme.colors.alert.info};
    }
  }
`;
const Thead = styled.thead.attrs({})`
  /* outline: 1px solid; */

  /* stylelint-disable no-descending-specificity */
  ${Td} {
    background-color: ${({ theme }) => theme.colors.darkAccent};
  }
  /* stylelint-enable no-descending-specificity */
`;

function Header() {
  const { columns, cellProps, rowProps } = React.useContext(TblCtx);

  const ths = React.useMemo(() => (
    columns?.map((column, x) => (
      <Td as='th' key={x} {...cellProps?.(undefined, x, [])}>
        {column instanceof Function
          ? column(undefined, x, [])
          : column}
      </Td>
    ))
  ), [columns, cellProps]);

  return (
    <Thead>
      <Tr {...rowProps?.(undefined, -1, [])}>{ths}</Tr>
    </Thead>
  );
}
function Body() {
  const {
    columns, items, cellProps, rowProps,
  } = React.useContext(TblCtx);

  const trs = React.useMemo(() => (
    items.map((row, y) => (
      <Tr key={y} {...rowProps?.(row, y, items)}>
        {columns?.map((column, x) => (
          <Td key={`${y}.${x}`} {...cellProps?.(row, x, items)}>
            {column instanceof Function
              ? column(row, x, items)
              : row[column]}
          </Td>
        ))}
      </Tr>
    ))
  ), [cellProps, columns, items, rowProps]);

  return (
    <Tbody>
      {trs}
    </Tbody>
  );
}

export default Table;
