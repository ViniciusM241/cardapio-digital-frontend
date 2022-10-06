import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Container } from './styles';

function SliderItem({
  item,
  index,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash;

  const redirect = () => {
    const top = document.getElementById(encodeURI(item.title)).offsetTop;

    window.scrollTo({ top, behavior: 'smooth' });

    navigate(`/#${encodeURI(item.title)}`);
  };

  return (
    <Container
      active={hash ? `#${encodeURI(item.title)}` === hash : index === 0}
      onClick={redirect}
    >
      {item.title}
    </Container>
  );
}

export default SliderItem;
