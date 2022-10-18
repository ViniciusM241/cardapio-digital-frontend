import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import getCustomers from './services/getCustomers';

import {
  Container,
  T1,
  Inline,
  Table,
} from '~/components';
import { phone } from '~/utils/masks';

function Customers() {
  const [filters, setFilters] = useState('');
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
    const customers = await getCustomers();

    setCustomers(customers);
  };

  const onFetchData = ({ order, pageIndex, maxPage }) => {
    const query = [];

    query.push(`_start=${pageIndex * maxPage}&_limit=${maxPage}`);

    if (order)
      query.push(`_sort=${order.accessor}&_order=${order.asc ? 'asc' : 'desc'}`);

    setFilters(query.join('&'));
  };

  useEffect(() => {
    _getCustomers();
  }, []);

  return (
    <Container>
      <T1>Lista de clientes</T1>
      <Inline>
        <Table
          data={customers}
          columns={columns}
          onClickRow={() => {}}
          onFetchData={onFetchData}
          maxPage={5}
          total={5}
        />
      </Inline>
    </Container>
  );
}

export default Customers;
