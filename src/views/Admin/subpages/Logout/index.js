import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '~/boot/auth';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    navigate('/');
  }, []);

  return null;
}

export default Logout;
