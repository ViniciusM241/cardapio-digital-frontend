import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import getCustomers from './services/getCustomers';
import getCustomersCount from './services/getCustomersCount';

import {
  Container,
  T1,
  Inline,
  Table,
} from '~/components';
import { phone } from '~/utils/masks';

function Customers() {
  const [filters, setFilters] = useState('');
  const [count, setCount] = useState(5);
  const [customers, setCustomers] = useState([]);

  const columns = useMemo(() => [
    {
      label: 'Nome',
      accessor: 'name',
    },
    {
      label: 'Contato',
      accessor: 'phone',
      value: (original, row) => {
        const formatted = phone(row.replace('55', ''));
        return formatted;
      },
    },
    {
      label: 'Último Pedido',
      accessor: 'orders',
      value: (original, row) => {
        const order = row[0];

        if (order) {
          const url = `/administrativo/pedidos/${order.id}`;

          return <Link to={url}>#{String(order.id).padStart(3, '0')}</Link>;
        } else {
          return '-';
        }
      },
    },
  ], [moment]);

  const _getCustomers = async () => {
    const customers = await getCustomers(filters);

    setCustomers(customers);
  };

  const _getCustomersCount = async () => {
    const count = await getCustomersCount();

    setCount(count);
  };

  const onFetchData = ({ order, pageIndex, maxPage }) => {
    const query = [];

    query.push(`offset=${pageIndex * maxPage}&limit=${maxPage}`);

    if (order)
      query.push(`sort=${order.accessor || 'name'}&order=${order.asc ? 'asc' : 'desc'}`);

    setFilters(query.join('&'));
  };

  useEffect(() => {
    _getCustomers();
  }, [filters]);

  useEffect(() => {
    _getCustomersCount();
  }, []);

  return (
    <Container>
      <T1 className="mb-10">Lista de clientes</T1>
      <Inline>
        <Table
          data={customers}
          columns={columns}
          onClickRow={() => {}}
          onFetchData={onFetchData}
          maxPage={5}
          total={count}
        />
      </Inline>
    </Container>
  );
}

export default Customers;
