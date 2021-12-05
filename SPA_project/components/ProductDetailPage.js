import { request } from '../utils/api.js';
import ProductDetail from './ProductDetail.js';
export default function ProductDetailPage({$target,productId}){
    this.state = {
        productId,
        product:null,
    }
    const $page = document.createElement('div');
    $page.className = 'ProductDetailPage';
    $page.innerHTML = '<h1>상품정보</h1>';
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render =() =>{
        if(!this.state.product){
            $target.innerHTML ='Loading...';
        }
        else{
            $target.innerHTML ='';
            $target.appendChild($page);

            new ProductDetail({
                $target:$page,
                initialState:{
                    product:this.state.product,
                    selectedOptions:[],
                }
            })
        }
    }
    this.fetchProduct = async () =>{
        const {productId} = this.state;
        const product = await request(`/products/${productId}`);
        this.setState({
            ...this.state,
            product
        })
    }
    this.fetchProduct();
}