export async function orderData(orders) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${apiUrl}/ordersData`, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(orders)
        });
        const data = await response.json();
       
        if (response.ok) {
              // Handle successful signup (e.g., redirect to login page, show success message)
              console.log('lorder added successful:', data);
        }
        else{
            console.error('order failed:', data.message);
        }

    
return data;

    } catch (error) {
        console.error('Error during adding order:', error);
    }
}


// export async function myOrderData(orders) {
//     try {
//         const response = await fetch("/api/myOrderData", {
//             method: "POST",
//             headers:{
//                 "Content-Type" : "application/json"
//             },
//             body:JSON.stringify(orders)
//         });
//         const data = await response.json();
       
//         if (response.ok) {
//               // Handle successful signup (e.g., redirect to login page, show success message)
//               console.log('order show successful:', data);
//         }
//         else{
//             console.error('order failed:', data.message);
//         }

    
// return data;

//     } catch (error) {
//         console.error('Error during showing order:', error);
//     }
// }