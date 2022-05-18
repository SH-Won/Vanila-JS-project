export default function SearchInput({$target,initialState,onChange}){
    this.$element = document.createElement('form');
    this.$element.className = 'SearchInput';
    $target.appendChild(this.$element);
    this.state = initialState;
    this.setState = (nextState) =>{
        this.sate = nextState;
        this.render();
    }
    this.render = () =>{
        this.$element.innerHTML = `
        <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}">
        `
    }
    // this.$element.focus();
    this.render();
    this.$element.addEventListener('keyup', e =>{
        const ignoreKeyDirections = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter'];
        if(!ignoreKeyDirections.includes(e.key)){
            let searchValue = e.target.value;
            setTimeout(() =>{
                if(searchValue === e.target.value) onChange(searchValue);
            },200)
        }
    })
    this.$element.addEventListener('submit', e => {
        e.preventDefault();
    })
    
    
}