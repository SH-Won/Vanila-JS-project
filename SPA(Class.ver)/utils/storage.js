const storage = localStorage;
export const getItem = (key,defaultValue) =>{
    try{
        const value = storage.getItem(key)
        return value ? JSON.parse(value) : defaultValue;

    }catch(e){
         return defaultValue;
    }
}
export const setItem = (key,value) =>{
    try{
        storage.setItem(key,JSON.stringify(value));
    }catch(e){

    }
}
export const removeItem = (key) =>{
    try{
        storage.removeItem(key);
    }catch(e){

    }
}