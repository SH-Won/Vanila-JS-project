import {request} from '../utils/api.js'
import ProductDetail from './ProductDetail.js';
export default class ProductDetailPage{
    constructor({$target,productId}){
        this.$target = $target;
        this.$page = document.createElement('div');
        this.$page.className = 'ProductDetailPage';
        this.state = {
            productId,
            product: null
        }
    }
    init = () =>{
        this.fetchProduct();
        this.render();
    }
    setState = (nextState) =>{
        this.state = nextState ;
        this.render();
    } 
    render = () =>{
        if(!this.state.product) return ;
        this.$target.appendChild(this.$page);
        this.$page.innerHTML = `<h1>${this.state.product.name} 상품 정보</h1>`;
        new ProductDetail({
            $target:this.$page,
            initialState : {
                product: this.state.product,
                selectedOptions : [],
            }
        }).init();
    }
    fetchProduct = async () =>{
        const {productId} = this.state;
        const product = await request(`/${productId}`);
        this.setState({
            ...this.state,
            product,
        })
    }
}