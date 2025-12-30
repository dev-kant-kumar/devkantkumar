import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRefreshTokenMutation } from '../../store/auth/authApi';
import { logout, selectCurrentToken, setCredentials } from '../../store/auth/authSlice';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refreshToken().unwrap();
        if (isMounted) {
          dispatch(setCredentials({ ...response, token: response.token }));
          setTrueSuccess(true);
        }
      } catch (err) {
        // Only log errors if it's not a generic 401 (meaning just not logged in)
        // or effectively treat 401 as "Guest User"
        if (err?.status !== 401) {
          console.error('Failed to refresh token:', err);
        }

        // If refresh fails, clear auth state
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // If we have no token, try to get one
    if (!token) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount


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
