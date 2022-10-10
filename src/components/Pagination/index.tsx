import * as React from 'react';
import styled from 'styled-components';
import Dropdown from '../Dropdown';
import { Prev, Next } from '../../icons';

export interface PaginationProps {
  totalItems?: number;
  // eslint-disable-next-line no-unused-vars
  onPaginationChange?: (options: { page?: number, pageSize?: number}) => void;
  page?: number;
  pageSize?: number;
}

const Pages = new Intl.NumberFormat('en', {
  unit: 'week',
  style: 'unit',
  useGrouping: true,
});
const options = [
  { value: 10 },
  { value: 25 },
  { value: 50 },
  { value: 100 },
];
const minPageSize = Math.min(...options.map(({ value }) => value));

const Pagination = ({
  totalItems = 0, page = 1, pageSize = minPageSize, onPaginationChange,
}: PaginationProps) => {
  const [pages, pagesLabel] = React.useMemo(() => {
    const pages = Math.ceil(totalItems / pageSize);
    return [
      pages,
      Pages.format(pages).replace(/wk/, 'page'),
    ];
  }, [totalItems, pageSize]);

  const handleMove = React.useCallback(({ currentTarget }) => {
    const { dir } = currentTarget.dataset;
    const newPage = page + (dir === 'right' ? 1 : -1);
    onPaginationChange?.({ page: newPage });
  }, [onPaginationChange, page]);

  return totalItems <= minPageSize ? null : (
    <Container>
      <Left>{pagesLabel}</Left>
      <Middle>
        <Move data-dir='left' onClick={handleMove} disabled={page === 1}>
          <Prev />
        </Move>
        <Jump
          value={page}
          max={pages}
          onChange={({ target }) => {
            const newPage = target.valueAsNumber;
            if (newPage) {
              onPaginationChange?.({
                page: newPage,
              });
            }
          }}
        />
        <Move data-dir='right' onClick={handleMove} disabled={page === pages}>
          <Next />
        </Move>
      </Middle>
      <Right>
        <Dropdown
          size={10}
          value={pageSize}
          options={options}
          onChange={(newPage = 10) => {
            onPaginationChange?.({
              page: 1,
              pageSize: newPage,
            });
          }}
        />
      </Right>
    </Container>
  );
};

const Left = styled.div`
  color: ${({ theme }) => theme.colors.fg};
`;
const Middle = styled.div`
  color: ${({ theme }) => theme.colors.fg};
`;
const Right = styled.div`
  color: ${({ theme }) => theme.colors.fg};
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;

  /* border-radius: 1ic / 50%;
  outline: 1px solid ${({ theme }) => theme.colors.grays.jet}; */

  ${({ theme }) => theme.cutBorder}
  --background: ${({ theme }) => theme.colors.bg};
  --border-color: ${({ theme }) => theme.colors.grays.jet};
  --border-width: 1px;
  --edge-size: 0.75em;

  > * {
    padding: 0.5ic 1ic;
    padding: 4px 4px 6px;
  }

  ${Left},
  ${Right} {
    flex: 0;
    white-space: nowrap;
  }

  ${Middle} {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Jump = styled.input.attrs({
  type: 'number',
  min: 1,
})`
  width: 5ic;
  padding: 0.25ic 0.5ic;
  text-align: center;
  color: ${({ theme }) => theme.colors.fg};
  background: ${({ theme }) => theme.colors.grays.eerieBlack};
  border: none;
  outline: 1px solid ${({ theme }) => theme.colors.grays.jet};
  outline-offset: -1px;

  &:not(:focus-within):hover {
    outline: 1px solid ${({ theme }) => theme.colors.alert.info};
  }
  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.alert.info};
  }
`;
const Move = styled.button.attrs({})`
  padding: 0.25ic 0.5ic;
  border: none;
  color: ${({ theme }) => theme.colors.fg};
  background: ${({ theme }) => theme.colors.grays.eerieBlack};
  outline: 1px solid ${({ theme }) => theme.colors.grays.jet};
  outline-offset: -1px;

  &:not([disabled]) {
    &:not(:focus):hover {
      outline: 1px solid ${({ theme }) => theme.colors.alert.info};
    }
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.alert.info};
    }
  }

  &[disabled] {
    background: transparent;
    color: ${({ theme }) => theme.colors.grays.spanishGray};
    outline: none;
  }
`;

export default Pagination;
