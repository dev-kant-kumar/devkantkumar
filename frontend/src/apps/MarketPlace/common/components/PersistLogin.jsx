import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useRefreshTokenMutation } from '../../store/auth/authApi';
import { selectCurrentToken, setCredentials } from '../../store/auth/authSlice';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refreshToken().unwrap();
        if (isMounted) {
          dispatch(setCredentials({ ...response, token: response.token }));
        }
      } catch (err) {
        // Refresh failed - user is a guest, just clean up
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Only try to restore session if:
    // 1. No token in Redux state AND
    // 2. There's a localStorage token (indicating a previous session)
    const storedToken = localStorage.getItem('token');

    if (!token && storedToken) {
      // Previous session exists, try to refresh
      verifyRefreshToken();
    } else {
      // Either already have token OR never had a session - just continue
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return <Outlet />;
};

export default PersistLogin;
