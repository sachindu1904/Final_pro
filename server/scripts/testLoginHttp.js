const http = require('http');

// Admin credentials
const data = JSON.stringify({
  email: 'admin@eventuraa.com',
  password: 'adminpass123'
});

// Request options
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/signin',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

// Make request
console.log('Attempting to login as admin...');

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(responseData);
      console.log('Response:', JSON.stringify(parsedData, null, 2));
      
      if (parsedData.success) {
        console.log('Login successful!');
      } else {
        console.log('Login failed:', parsedData.message);
      }
    } catch (e) {
      console.error('Error parsing response:', e.message);
      console.log('Raw response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error.message);
});

// Write request data and end
req.write(data);
req.end(); 