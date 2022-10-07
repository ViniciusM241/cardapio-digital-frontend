import {
  MdHome,
  MdStickyNote2,
  MdPerson,
  MdOutlineNoteAlt,
  MdLogout,
  MdOutlineQrCode2,
} from 'react-icons/md';

export default [
  {
    path: '/administrativo',
    to: '/administrativo',
    name: 'Início',
    icon: MdHome,
  },
  {
    path: '/administrativo/pedidos',
    to: '/administrativo/pedidos',
    name: 'Pedidos',
    icon: MdStickyNote2,
  },
  {
    path: '/administrativo/clientes',
    to: '/administrativo/clientes',
    name: 'Clientes',
    icon: MdPerson,
  },
  {
    path: '/administrativo/cardapio',
    to: '/administrativo/cardapio',
    name: 'Cardápio',
    icon: MdOutlineNoteAlt,
  },
  {
    path: '/administrativo/configuracoes',
    to: '/administrativo/configuracoes',
    name: 'Configurações',
    icon: MdOutlineQrCode2,
  },
];
