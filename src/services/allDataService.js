// "use client"

// const baseUrl = process.env.BASE_URL;
// console.log("base url:----------", baseUrl);

export async function allItemData() {
  
    
try {

    const data = await fetch("/api/alldata");
    if(!data.ok){
        throw new Error("Failed to fetch data");
    }
    return data.json();
} catch (error) {
    console.error('Error fetching data:', error);

}
}