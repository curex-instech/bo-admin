import type { UserLoginInfo } from '@mymind/banh-mi';
import { GoogleLogin } from '@react-oauth/google';
import { Button, Form, Input, message, Typography } from 'antd';
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

  const handlePasswordLogin = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const { email, password } = values;
      request
        .post(`/api/auth/login/`, {
          email,
          password,
        })
        .then((res) => {
          console.log('res', res);
          const userInfo: UserLoginInfo = {
            user: {
              userid: email,
              email,
              username: email,
              picture: '',
            },
          };
          setEncryptedItem(STORAGE_KEYS.USER_INFO, userInfo);
          window.location.reload();
        })
        .catch(() => {
          message.error('Email hoặc mật khẩu không đúng');
        });
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        console.error('[ERROR]: login failed', error.response);
      }
    }
  };

  return (
    <div className="w-100">
      <Typography.Title level={2} className="text-right">
        Đăng nhập
      </Typography.Title>
      <Form
        labelAlign="left"
        name="form-password-login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handlePasswordLogin}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            {
              type: 'email',
              message: 'Vui lòng nhập email hợp lệ',
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <div className="text-right">
          <Button type="primary" htmlType="submit" className="mb-8">
            Đăng nhập
          </Button>
        </div>
      </Form>
      <Typography.Paragraph className="text-center">
        Hoặc đăng nhập với tài khoản Google
      </Typography.Paragraph>
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          handleAdminLogin(credentialResponse as CredentialsResponse)
        }
      />
    </div>
  );
};

export default LoginPage;
