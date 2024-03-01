// api.js

export async function validateToken(token) {
    console.log('validateToken is called');                        // debugin pruposes
    console.log('validateToken was called with token:', token);   // debugin pruposes
    try {
        const response = await fetch(`http://localhost:3001/validate_token?token=${token}`);
  
      if (!response.ok) {
        console.error('Failed to validate token: ', response.status);
        return null;
      }
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }