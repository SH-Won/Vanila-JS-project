export default class SelectedOptions{
    constructor({$target,initialState}){
        this.$target = $target;
        this.state = initialState;
        this.$component = document.createElement('ul');
    }
    init = () => {
        this.render();
    }
    setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    render = () =>{
        const {product,selectedOptions:[]} = this.state;
        if(selectedOptions.length === 0) return;
        this.$target.appendChild(this.$component);
        this.$component.innerHTML =`
        
        `
    }
}