const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('Attempting to login as admin...');
    const response = await axios.post('http://localhost:5000/api/auth/signin', {
      email: 'admin@eventuraa.com',
      password: 'adminpass123'
    });
    
    console.log('Login successful!');
    console.log('Response data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Login failed');
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    } else {
      console.error('Error:', error.message);
    }
  }
};

testLogin(); 