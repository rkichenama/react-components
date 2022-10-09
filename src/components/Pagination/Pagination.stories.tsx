import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
// import { SamplePage } from '../../shared/storybook.utils';
import Component from '.';
import Table from '../Table';
import { matrix } from './testData';

export default {
  title: 'Interactive/Pagination',
  component: Component,
  decorators: [/* SamplePage */],
  argTypes: {
    totalItems: {
      description: 'total number of items to manage paging through',
    },
    onPaginationChange: {
      description: 'callback to be notified of pagination changes',
    },
  },
} as ComponentMeta<typeof Component>;

export function Pagination({ totalItems }) {
  const [opts, setPagination] = React.useState({ page: 1, pageSize: 10 });

  return (
    <Component
      {...{ totalItems }}
      {...opts}
      onPaginationChange={
        ({ page = opts.page, pageSize = opts.pageSize }) => {
          setPagination({ page, pageSize });
        }
      }
    />
  );
}

Pagination.args = {
  totalItems: 5,
};

export function WithTable() {
  const [opts, setPagination] = React.useState({ page: 1, pageSize: 10 });

  const slice = React.useMemo(() => {
    const start = (opts.page - 1) * opts.pageSize;
    return matrix.slice(start, start + opts.pageSize);
  }, [opts.page, opts.pageSize]);

  const pager = (
    <Component
      totalItems={matrix.length}
      {...opts}
      onPaginationChange={
        ({ page = opts.page, pageSize = opts.pageSize }) => {
          setPagination({ page, pageSize });
        }
      }
    />
  );

  const selectCol = (row) => {
    if (!row) { return ''; }

    return (<input type='checkbox' />);
  };

  return (
    <>
      {pager}
      <Table
        items={slice}
        columns={[selectCol, 'age', 'name']}
        cellProps={(_, column) => (
          column < 2 ? { width: '32', style: { textAlign: 'center' } } : {})}
      />
      {pager}
    </>
  );
}
