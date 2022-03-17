import {getItem} from '../utils/storage.js';
import {request}  from '../utils/api.js';
import { routeChange } from '../utils/router.js';
import Cart from './Cart.js';
export default class CartPage{
    constructor({$target}){
        this.$target = $target;
        this.state = null;
        this.$page = document.createElement('div');
        this.$page.className = 'CartPage';
        this.$page.innerHTML = '<h1>장바구니</h1>';
        this.cartComponent = null;
    }
    init = () =>{
        this.fetchProducts();
    }
    setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    render = () =>{
        if(!this.state){
            alert("장바구니가 비었습니다");
            routeChange('/web/');
        }
        else{
            this.$target.appendChild(this.$page);
            this.cartComponent = new Cart({
                $target : this.$page,
                initialState : this.state,
            }).init();
        }
    }
    fetchProducts = async () =>{
        const cartData = getItem('products_cart',[]);
        if(cartData.length === 0) return; 
        const products = await Promise.all(cartData.map(async (item) =>{
            const product = await request(`/${item.productId}`);
            const option = product.productOptions.find(option => option.id === item.optionId);
            return {
                imageUrl : product.imageUrl,
                productName : product.name,
                productPrice : product.price,
                optionName: option.name,
                optionPrice: option.price,
                quantity : item.quantity,
            }
        }))
        this.setState({products})
    }
}