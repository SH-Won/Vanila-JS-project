const ENDPOINT ='...';
// export const request = (node) =>{
//     fetch(`${ENDPOINT}/${node}`)
//     .then(response =>{
//         if(response.ok){
//             const json = response.json();
//             return json;
//         }
//         else throw new Error("무언가 잘못됬습니다");
//     })
//     .catch(err => console.log(err));
// }
export const request = (nodeId) =>{
    try{
        const res = await fetch(`${ENDPOINT}/${nodeId ? nodeId : ""}`);
        if(!res.ok) throw new Error("서버상태가 이상합니다");
        return await res.json();
    } catch(e){
        throw new Error("무언가 잘못됐습니다");
    }
}

