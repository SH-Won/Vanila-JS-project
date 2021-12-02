const data = [
    {
        "id":"1",
        "name":"사진",
        "type":"DIRECTORY",
        "filePath":null,
        "child":[

        ]
    },
    {
        "id":"2",
        "name":"a",
        "type":"FILE",
        "filePath":"./assets/2",
        "child":[

        ]
    },
]
const request = (nodeId) =>{
    if(!nodeId) return data;
    const nodes = data.find(node => node.id === nodeId);
    return nodes.child;
}