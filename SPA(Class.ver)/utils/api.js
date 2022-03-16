const ENDPOINT = ''
export const request = async (url="") =>{
     try{
        const fullURL = `${ENDPOINT}${url}`;
        const res = await fetch(fullURL);
        if(!res.ok) throw new Error("서버가 이상해요");
        return await res.json();
     }catch(e){
        throw new Error("무언가 잘못됐습니다");
     }
}