const ENDPOINT = '...';

export const request = (nodeId) =>{
    try{
        const res = await fetch(`${ENDPOINT}/${nodeId ? nodeId : ""}`);
        if(!res.ok){
            throw new Error("서버 상태 이상합니다.");
        }
        return await res.json();
    }catch(e){
        throw new Error("무언가 잘못 됐습니다")
    }
}