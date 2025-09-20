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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // The server now sets the HttpOnly cookie, no need to extract token from response body
        // and no need for client-side Cookies.set
        const responseData = await response.json();
        toast({
          title: "Login Successful!",
          description: `Redirecting to ${responseData.role === 'admin' ? 'admin panel' : 'homepage'}...`,
        });
        if (responseData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/'); // Redirect to homepage or any other appropriate route
        }
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
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '10px 0', padding: '10px', color: 'black' }}
         
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px 0', padding: '10px', color: 'black' }}
          autoComplete="current-password"
        />
        <button type="submit" style={{ padding: '10px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;