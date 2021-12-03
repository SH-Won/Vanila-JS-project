const ENDPOINT ="";

export const request = async (url) =>{
    try{
        const fullURL = `${ENDPOINT}${url}`;
        const res = await fetch(fullURL);
        if(!res.ok) throw new Error("잘못 됐습니다");
        return await res.json()
    }catch(e){
        alert(e.message);
    }
}