export default function Nodes({$app,initialState,onClick}){
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement('ul');
    this.$target.className = 'Node';
    $app.appendChild(this.$target);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = ()=>{
        const nodesTemplate = this.state.nodes.map(node =>{
            const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png';
            return `
            <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" />
            <div>${node.name}</div>
            </div>
            `
        }).join('');
        this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="/assets/prev.png"></div>${nodesTemplate}` : nodesTemplate
    }
    this.$target.addEventListener('click',e =>{
        const $node = e.target.closest('.Node');
        if($node){
            const {nodeId} = $node.dataset;
        }
    })
    this.render();
}