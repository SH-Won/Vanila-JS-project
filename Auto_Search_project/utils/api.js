const ENDPOINT = '';
const cache  = new Map();

const request = async (url) =>{
    try{
        if(cache.has(url)) return cache.get(url);
        const res = await fetch(url);
        if(res.ok){
            const json = await res.json();
            cache.set(url,json);
            return json;
        }
    }catch(e){
        throw new Error("무언가 잘못됐습니다");
    }
}
export const fetchLanguages = async (keyword) => await request(`${ENDPOINT}/keyword=${keyword}`) 