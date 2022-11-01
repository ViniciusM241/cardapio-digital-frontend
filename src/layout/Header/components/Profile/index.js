import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '~/views/Admin/store/actions';
import useOutsideClick from '~/hooks/useOutsideClick';

import { Wrapper, Collapse, CollapseItem, Item } from './styles';
import { MdLogout, MdPerson } from 'react-icons/md';

const menus = [
  {
    name: 'Perfil',
    to: '/administrativo/perfil',
    icon: MdPerson,
  },
  {
    name: 'Sair',
    to: '/administrativo/sair',
    icon: MdLogout,
  },
];

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const profile = useSelector(state => state.admin.profile);

  const [isOpened, setIsOpened] = useState(false);

  useOutsideClick(wrapperRef, () => setIsOpened(false));

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const redirect = (to) => {
    navigate(to);
    toggleIsOpened();
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Item className='ml-10' onClick={toggleIsOpened}>
        {profile.name}
      </Item>
      {
        isOpened && (
          <Collapse>
            {
              menus.map((menu, index) => (
                <CollapseItem key={index} onClick={() => redirect(menu.to)}>
                  {
                    React.createElement(menu.icon, {
                      className: 'mr-10',
                    })
                  }
                  {menu.name}
                </CollapseItem>
              ))
            }

          </Collapse>
        )
      }
    </Wrapper>
  );
}

export default Profile;
