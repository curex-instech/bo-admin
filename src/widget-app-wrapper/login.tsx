import type { UserLoginInfo } from '@mymind/banh-mi';
import { GoogleLogin } from '@react-oauth/google';
import type { AxiosError } from 'axios';
import { decodeJwt } from 'src/_shared/auth/utils';
import { STORAGE_KEYS } from 'src/_shared/constants';
import { request } from 'src/_shared/request';
import { setEncryptedItem } from 'src/_shared/storage';

type CredentialsResponse = {
  clientId: string;
  credential: string;
  select_by: string;
};

const LoginPage = () => {
  const handleAdminLogin = async (credentialResponse: CredentialsResponse) => {
    try {
      const { payload } = decodeJwt(credentialResponse.credential);
      console.log('decoded', payload);

      await request.post(`/api/auth/login/`, {
        email: payload.email,
        id_token: credentialResponse.credential,
      });

      const userInfo: UserLoginInfo = {
        user: {
          userid: payload.sub,
          email: payload.email,
          username: payload.name,
          picture: payload.picture,
        },
      };

      setEncryptedItem(STORAGE_KEYS.USER_INFO, userInfo);
      window.location.reload();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        console.log('admin login error', error.response);
      }
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          handleAdminLogin(credentialResponse as CredentialsResponse)
        }
      />
    </div>
  );
};

export default LoginPage;
