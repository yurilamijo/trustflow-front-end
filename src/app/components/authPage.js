import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./Login'));
const Register = dynamic(() => import('./Register'));

export default function AuthPage({ isLogin, onRegistrationSuccess }) {
  return (
    <div>
      {isLogin ? <Login /> : <Register onSuccess={onRegistrationSuccess} />}
    </div>
  );
}