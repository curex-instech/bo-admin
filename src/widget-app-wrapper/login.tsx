import type { UserLoginInfo } from '@mymind/banh-mi';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import type { AxiosError } from 'axios';
import { STORAGE_KEYS } from 'src/_shared/constants';
import { setEncryptedItem } from 'src/_shared/storage';

async function getGoogleUserInfo(accessToken: string) {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user info: ${response.status} ${response.statusText}`,
    );
  }

  const userInfo = await response.json();
  return userInfo;
}

const LoginPage = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => handleAdminLogin(tokenResponse),
  });

  const handleAdminLogin = async (credentialResponse: any) => {
    try {
      const googleUserInfo = await getGoogleUserInfo(
        credentialResponse.access_token,
      );

      console.log('userInfo', googleUserInfo);

      /**
       * TODO
       * 1. call BE login api
       * 2. update user login info
       */
      // const profileResponse = await request.post(`/api/auth/login`, {
      //   email: userInfo.email,
      //   token_id: credentialResponse.access_token,
      // });

      const userInfo: UserLoginInfo = {
        user: {
          userid: '1',
          email: googleUserInfo.email,
          username: googleUserInfo.name,
          // picture: googleUserInfo.picture,
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
      <Button onClick={login as any}>Login with Google</Button>
    </div>
  );
};

export default LoginPage;
