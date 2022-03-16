import {routeChange} from '../utils/router.js'
export default class ProductList{
    constructor({$target,initialState}){
        this.$target = $target;
        this.state = initialState;
        this.$productList = document.createElement('ul');
    }
    init = () =>{
        this.$productList.addEventListener('click', e =>{
           const $li = e.target.closest('li');
           const {productId} = $li.dataset;
           routeChange(`/web/products/${productId}`);
           console.log('1');
        })
        this.render();
        
    }
    render = () =>{
        const {products} = this.state;
        this.$target.appendChild(this.$productList);
        this.$productList.innerHTML =`
        ${products.map(product => `
        <li class="Product" data-product-id=${product.id}>
            <img src="${product.imageUrl}">
            <div class="Product__info">
              <div>${product.name}</div>
              <div>${product.price}~</div>
            </div>
          </li>
        `).join('')}
        `
    }
}