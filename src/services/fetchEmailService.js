
export const fetchUserData = async () => {

    if (typeof window === 'undefined') {
        throw new Error('localStorage is not available on the server side');
    }
    const token = localStorage.getItem('token');
  
    if (!token) {
      throw new Error('Token not found');
    }
  
    const response = await fetch('/api/current', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
  
    const data = await response.json();
    return data;
  };
  