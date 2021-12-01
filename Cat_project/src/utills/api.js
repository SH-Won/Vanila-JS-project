const ENDPOINT = '...';

export const request = (nodeId) =>{
    try{
        const res = fetch(`${ENDPOINT}/${nodeId ? nodeId : ""}`);
        if(!res.ok){
            throw new Error("서버 상태 이상합니다.");
        }
        return res.json();
    }catch(e){
        
    }
}