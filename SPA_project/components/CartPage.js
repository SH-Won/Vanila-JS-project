import { request } from '../utils/api';
import {getItem} from '../utils/storage';
import { routeChange } from '../utils/router';
import Cart from './Cart';
export default function CartPage({$target}){
    const $page = document.createElement('div');
    $page.className = 'CartPage'
    $page.innerHTML = '<h1>장바구니</h1>';

    const cartData = getItem('products_cart',[]);
    this.state = {
        products:null
    }
    let cartComponent = null;

    this.render = () =>{
        if(cartData.length === 0){
            alert("장바구니가 비었습니다");
            routeChange('/');
        }else{
            $target.appendChild($page);
            if(this.state.products && !cartComponent){
                cartComponent = new Cart({
                    $target :$page,
                    initialState : this.state.products
                })
            }
        }
    }
    this.setState = ( nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.fetchProducts = async () =>{
        const products = await Promise.all(cartData.map(async (cartItem) =>{
            const product = await request(`/products/${cartItem.productId}`)
            const selectedOption = product.productOptions.find(option => option.id === cartItem.optionId);
            return {
                imageUrl : product.imageUrl,
                productName :product.name,
                quantity :cartItem.quantity,
                productPrice :product.price,
                optionName : selectedOption.name,
                optionPrice :selectedOption.price
            }
        }))
        this.setState({products})
    }
    this.fetchProducts();
}