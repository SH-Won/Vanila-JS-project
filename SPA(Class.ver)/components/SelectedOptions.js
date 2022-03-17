import {routeChange} from '../utils/router.js';
import {setItem,getItem} from '../utils/storage.js';
export default class SelectedOptions{
    constructor({$target,initialState}){
        this.$target = $target;
        this.state = initialState;
        this.$component = document.createElement('div');
    }
    init = () =>{
        this.$component.addEventListener('change',e =>{
            if(e.target.tagName !== 'INPUT') return;
            const nextQuantity = parseInt(e.target.value);
            if(typeof nextQuantity ==='number'){
                const {product,selectedOptions} = this.state
                const nextSelectedOptions = [...selectedOptions];
                const optionId = parseInt(e.target.dataset.optionId);
                const productOption = product.productOptions.find(option => option.id = optionId);
                const selectedOptionIdx = nextSelectedOptions.findIndex(option => option.optionId === optionId);
                console.log(productOption.stock);
                nextSelectedOptions[selectedOptionIdx].quantity = productOption.stock >= nextQuantity ? nextQuantity : productOption.stock;
                this.setState({
                    ...this.state,
                    selectedOptions : nextSelectedOptions,
                })
            }
        })
        this.$component.addEventListener('click',e =>{
            if(e.target.className !== 'OrderButton') return;
            const {selectedOptions,product} = this.state;
            const cartItem = getItem('products_cart',[]);
            setItem('products_cart',cartItem.concat(selectedOptions.map(option =>({
                productId : product.id,
                optionId: option.optionId,
                quantity : option.quantity,
            }))))
            routeChange('/web/cart');
        })

        this.render();
    }
    setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    getTotalPrice = () =>{
        const {product,selectedOptions} = this.state;
        return selectedOptions.reduce((acc,option) => acc+= ( (product.price+option.optionPrice) * option.quantity),0)
    }
    render = () =>{
        const {product,selectedOptions} = this.state;
        if(selectedOptions.length === 0) return;
        this.$target.appendChild(this.$component);
        this.$component.innerHTML = `
        <ul>
        ${selectedOptions.map(option => `
        <li>
        ${product.name} ${option.optionName} ${(product.price + option.optionPrice) * option.quantity}원
        <div><input data-option-id="${option.optionId}" type="text" value="${option.quantity}">개</div>
        </li>
        `).join('')}
      </ul>
      <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
      <button class="OrderButton">주문하기</button>
        `
    }
}