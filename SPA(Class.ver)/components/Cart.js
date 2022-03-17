import { routeChange } from "../utils/router.js";
import {removeItem} from '../utils/storage.js';

export default class Cart{
    constructor({$target,initialState}){
        this.$target = $target;
        this.state = initialState;
        this.$component = document.createElement('div');
        this.$component.className ='Cart';
    }
    init = () =>{
        this.$component.addEventListener('click',e =>{
            if(e.target.className !== 'OrderButton') return;
            alert("주문 되었습니다.");
            removeItem('products_cart');
            routeChange('/web/')
        })
        this.render();
    }
    getTotalPrice = () =>{
        const {products} = this.state;
        return products.reduce((acc,product) => acc+= ((product.productPrice + product.optionPrice) * product.quantity),0);
    }
    render = () =>{
        const {products} = this.state;
        this.$target.appendChild(this.$component);
        this.$component.innerHTML =`
        <ul>
           ${products.map(product => `
           <li class="Cart__item">
              <img src='${product.imageUrl}'>
              <div class="Cart__itemDesription">
                <div>${product.productName} ${product.optionName} ${product.productPrice + product.optionPrice}원 ${product.quantity}개</div>
                <div>${(product.productPrice + product.optionPrice) * product.quantity}원</div>
              </div>
            </li>
           `).join('')}
          </ul>
          <div class="Cart__totalPrice">
            총 상품가격 ${this.getTotalPrice()}원
          </div>
          <button class="OrderButton">주문하기</button>
        `
    }
}