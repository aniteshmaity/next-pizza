// "use client"

// const baseUrl = process.env.BASE_URL;
// console.log("base url:----------", baseUrl);

export async function allItemData() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
try {

    const data = await fetch(`${apiUrl}/alldata`);
    if(!data.ok){
        throw new Error("Failed to fetch data");
    }
    return data.json();
} catch (error) {
    console.error('Error fetching data:', error);

}
}