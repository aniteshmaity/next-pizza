

export async function signup(user) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/signup`, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(user)
        });
        const data = await response.json();
        
        if (response.ok) {
              // Handle successful signup (e.g., redirect to login page, show success message)
              console.log('Signup successful:', data);
        }
        else{
            console.error('Signup failed:', data.message);
        }
      
        return data; 
        
        
    } catch (error) {
        console.error('Error during signup:', error);
    }
}

export async function login(users) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(users)
        });
        const data = await response.json();
       
        if (response.ok) {
              // Handle successful signup (e.g., redirect to login page, show success message)
              console.log('login successful:', data);
        }
        else{
            console.error('login failed:', data.message);
        }

    
return data;

    } catch (error) {
        console.error('Error during login:', error);
    }
}