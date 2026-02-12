import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth.ts";
import TokenManager from "../services/tokenManager.ts";

export const useForceLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return () => {
    localStorage.removeItem('refreshToken');
    TokenManager.clearToken();
    dispatch(authActions.unauthorize());
    navigate('/auth/signin');
  };
};