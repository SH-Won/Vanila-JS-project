import SelectedOptions from "./SelectedOptions.js";

export default class ProductDetail{
    constructor({$target,initialState}){
        this.$target = $target;
        this.state = initialState;
        this.$productDetail = document.createElement('div');
        this.$productDetail.className = 'ProductDetail';
        this.selectedOptions = null;
    }
    init = () =>{
        this.$productDetail.addEventListener('change',e =>{
            if(e.target.tagName !== 'SELECT') return;
            const {product,selectedOptions} = this.state;
            const selectedOptionId = parseInt(e.target.value);
            const productOption = product.productOptions.find(option => option.id === selectedOptionId);

            const selectedOption = selectedOptions.find(option => option.optionId === selectedOptionId);
            if(!selectedOption){
                const nextSelectedOptions = [
                    ...selectedOptions,
                    {
                        optionId : productOption.id,
                        optionName : productOption.name,
                        optionPrice : productOption.price,
                        quantity : 1
                    }
                ]
                this.setState({
                    ...this.state,
                    selectedOptions : nextSelectedOptions,
                })
            }
        })
        this.render();
    }
    setState = (nextState) =>{
        this.state = nextState;
        if(this.selectedOptions) this.selectedOptions.setState(this.state);
    }
    render = () =>{
        const {product} = this.state;
        this.$target.appendChild(this.$productDetail);
        this.$productDetail.innerHTML = `
        <img src='${product.imageUrl}'>
          <div class="ProductDetail__info">
            <h2>${product.name}</h2>
            <div class="ProductDetail__price">${product.price}원~</div>
            <select>
              <option>선택하세요.</option>
              ${product.productOptions.map(option => `
              <option value='${option.id}' ${option.stock === 0 ? 'disabled' : ''}>
              ${option.stock === 0 ? '(품절)':''}${product.name} ${option.name}${option.price > 0 ? `(+${option.price})`:''}
              </option>
              `).join('')}
            </select>
            <div class="ProductDetail__selectedOptions">
              <h3>선택된 상품</h3>
            </div>
          </div>
        `
        this.selectedOptions = new SelectedOptions({
            $target : document.querySelector('.ProductDetail__selectedOptions'),
            initialState: this.state,
        });
        this.selectedOptions.init();

    }
}