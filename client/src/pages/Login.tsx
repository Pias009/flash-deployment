import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://srv-theta.vercel.app/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('token', token);
        toast({
          title: "Login Successful!",
          description: "Redirecting to admin panel...",
        });
        navigate('/admin');
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.message || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "Could not connect to the server. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '10px 0', padding: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px 0', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;