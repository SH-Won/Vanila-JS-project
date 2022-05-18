export default function Suggestion({$target,initialState,onSelect}){
    this.$element = document.createElement('div');
    this.$element.className = 'Suggestion';
    this.state = initialState;
    $target.appendChild(this.$element);
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {items,selectedIndex} = this.state;
        if(items.length > 0){
            this.$element.style.display = 'block';
        this.$element.innerHTML = `
        <ul>
        ${items.map((item,index) => `
        <li data-index='${index}' class="${selectedIndex === index ? 'Suggestion__item--selected' : 'Suggestion__item--matched'}">
        ${item}
        </li>
        `).join('')}
        </ul>
        `
        }
        else{
            this.$element.style.display = 'none';
            this.$element.innerHTML = ''
        }
    }
    this.render();
    window.addEventListener('keyup', e =>{
        const {items,selectedIndex} = this.state;
        if(items.length === 0) return;
        const keyDirections = ['ArrowUp','ArrowDown'];
        if(keyDirections.includes(e.key)){
            let nextSelectedIndex ;
            if(e.key === 'ArrowUp'){
                nextSelectedIndex = selectedIndex === 0 ? items.length - 1 : selectedIndex - 1;
            }
            else if(e.key === 'ArrowDown'){
                nextSelectedIndex = selectedIndex === items.length - 1 ? 0 : selectedIndex + 1;
            }
            this.setState({
                ...this.state,
                selectedIndex:nextSelectedIndex,
            })
        }
        else if(e.key === 'Enter'){
            onSelect(items[selectedIndex]);
        }
    });
    this.$element.addEventListener('click', e =>{
        const $li = e.target.closest('li');
        if($li){
            const {index} = $li.dataset;
            onSelect(this.state.items[index]);
        }
    })
}