import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRefreshTokenMutation } from '../../store/auth/authApi';
import { selectCurrentToken, setCredentials } from '../../store/auth/authSlice';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await refreshToken().unwrap();
        dispatch(setCredentials({ ...response, token: response.token }));
      } catch (err) {
        console.error('Failed to refresh token:', err);
        // If refresh fails, we are not logged in.
        // We don't necessarily need to redirect here if this wraps public routes too,
        // but for protected routes, the DashboardLayout will handle the redirect.
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [token, refreshToken, dispatch]);

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
