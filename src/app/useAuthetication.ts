import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export function useAuthentication() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authenticated) {
    navigate('/signin');
  }
}