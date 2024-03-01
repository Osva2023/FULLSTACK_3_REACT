// Session.js
// Session.js

export async function storeSession(userId) {
    try {
      console.log('storeSession called with userId:', userId); // Debugging purposes
  
      const response = await fetch(`http://localhost:3001/api/session/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
  
      console.log('Response data:', data); // Debugging purposes
  
      if (data.status === 'ok') {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }