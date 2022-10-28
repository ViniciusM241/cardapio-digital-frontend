import React, { useEffect, useState } from 'react';
import useBreakpoints from '~/hooks/useBreakpoints';
import getReports from './services/getReports';
import ptBr from 'date-fns/locale/pt-BR';

import "react-datepicker/dist/react-datepicker.css";
import { DatePickerStyles } from './styles';
import { MdCalendarToday } from 'react-icons/md';
import { registerLocale } from 'react-datepicker';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Chart as ChartJS2,
  Tooltip as Tooltip2,
  Legend as Legend2,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

import {
  Container,
  Inline,
  Col,
  T1,
} from '~/components';
import Box from './components/Box';
import DatePicker from "react-datepicker";
import colors from '~/utils/colors';
import moment from 'moment';

registerLocale("ptBr", ptBr);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS2.register(ArcElement, Tooltip2, Legend2);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    yAxes: {
      ticks: {
        stepSize: 1
      },
      min: 0,
      suggestedMax: 10,
    }
  }
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
    },
  },
};

function AdminPage() {
  const breakpoints = useBreakpoints();

  const [reports, setReports]= useState({});
  const [ordersADaydata, setOrdersADayData]= useState({});
  const [paymentsPerOrdersData, setPaymentsPerOrdersData]= useState({});
  const [startDate, setStartDate] = useState(new Date());

  const _getReports = async () => {
    const date = moment(startDate).format('yyyy-MM-DD');
    const filters = `initDate=${date}`;
    const response = await getReports(filters);

    setReports(response);
  };

  useEffect(() => {
    _getReports();

    const interval = setInterval(() => {
      _getReports();
    }, 10000);

    return () => clearInterval(interval);
  }, [startDate]);

  useEffect(() => {
    const labels = reports?.totalOrdersADay?.map(x => {
      const date = moment(x['DATE(`createdAt`)']);
      return date.format('DD/MM');
    });

    const newData = {
      datasets: [
        {
          label: 'Pedidos',
          data: reports?.totalOrdersADay?.map(x => x['count']),
          borderColor: colors.YELLOW,
          backgroundColor: colors.YELLOW,
        },
      ],
      labels,
    };

    setOrdersADayData(newData);
  }, [reports]);

  useEffect(() => {
    const labels = ['Pagos', 'Em aberto'];

    const newData = {
      datasets: [
        {
          label: '# de pedidos',
          data: [reports?.paymentsPerOrders?.payd, reports?.paymentsPerOrders?.total],
          borderColor: [
            colors.GREEN,
            colors.RED,
          ],
          backgroundColor: [
            colors.GREEN,
            colors.RED,
          ],
        },
      ],
      labels,
    };

    setPaymentsPerOrdersData(newData);
  }, [reports]);

  return (
    <Container>
      <Col cols={12}>
        <Inline className='mb-10' right>
          <DatePicker
            locale="ptBr"
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)}
          />
          <MdCalendarToday className="ml-10" style={{ fontSize: '1.3rem' }} />
        </Inline>
      </Col>
      <Col cols={6} xs={12}>
        <Box title='Quantidade de pedidos'>
          <T1 style={{ color: colors.GREEN, fontSize: '5rem', fontWeight: '400' }}>
            {reports?.qtyOrders ? String(reports?.qtyOrders)?.padStart(3, '0') : '000'}
          </T1>
        </Box>
      </Col>
      <Col className={breakpoints.xs ? 'mt-10' : ''} cols={6} xs={12}>
        <Box title='Tempo médio de preparo'>
          <T1 style={{ color: colors.RED, fontSize: '5rem', fontWeight: '400' }}>
            {
              reports?.avgOrderTime ?
                reports.avgOrderTime >= 60 ? `${(reports.avgOrderTime / 60).toFixed(2)}h` : `${Number(reports.avgOrderTime).toFixed(2)}m`
              :
                '00m'
            }
          </T1>
        </Box>
      </Col>
      <Col className='mt-10' cols={6} xs={12}>
        <Box title='Pedidos por dia'>
          {
            ordersADaydata.labels && (
              <Line className='mt-10' options={options} data={ordersADaydata} />
            )
          }
        </Box>
      </Col>
      <Col className='mt-10' cols={6} xs={12}>
        <Box title='Pagamentos por pedidos'>
          {
            paymentsPerOrdersData.labels && (
              <Doughnut options={options2} className='mt-20' data={paymentsPerOrdersData} />
            )
          }
        </Box>
      </Col>
      <DatePickerStyles />
    </Container>
  );
}

export default AdminPage;
