import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { MapPin, Phone } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (phone.length > 5) {
      // Mock logic: set fake user and token
      localStorage.setItem('user_token', 'mock_token_123');
      localStorage.setItem('user_phone', phone);
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-8">
      <div className="text-center space-y-2">
        <div className="bg-primary-100 p-4 rounded-full inline-block mb-2">
          <MapPin className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Safar</h1>
        <p className="text-slate-500 text-lg">Your community travel partner</p>
      </div>

      <Card className="w-full">
        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Mobile Number" 
            id="phone" 
            type="tel" 
            placeholder="Enter your digits..." 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit">
            <Phone className="w-5 h-5 mr-1" />
            Get OTP
          </Button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6 pb-2">
          By continuing, you agree to our Terms & Conditions
        </p>
      </Card>
    </div>
  );
};

export default Login;
