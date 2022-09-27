import {
  MdHome,
  MdStickyNote2,
  MdPerson,
  MdOutlineNoteAlt,
  MdLogout,
} from 'react-icons/md';

export default [
  {
    path: '/administrativo',
    to: '/administrativo',
    name: 'Início',
    icon: MdHome,
  },
  {
    path: '/pedidos',
    to: '/pedidos',
    name: 'Pedidos',
    icon: MdStickyNote2,
  },
  {
    path: '/clientes',
    to: '/clientes',
    name: 'Clientes',
    icon: MdPerson,
  },
  {
    path: '/cardapio',
    to: '/cardapio',
    name: 'Cardápio',
    icon: MdOutlineNoteAlt,
  },
  {
    path: '/sair',
    to: '/sair',
    name: 'Sair',
    icon: MdLogout,
  },
];
