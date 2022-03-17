import {request} from '../utils/api.js';
import ProductList from './ProductList.js';
export default class ProductListPage{
    constructor({$target}){
        this.$target = $target;
        this.$page = document.createElement('div');
        this.$page.className = 'ProductListPage';
        this.$page.innerHTML = '<h1>상품목록</h1>';
        this.state = null;
    }
    init = () =>{
        this.fetchPosts();
    }
    setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    render = () =>{
        if(!this.state) return;
        this.$target.appendChild(this.$page);
        new ProductList({
            $target:this.$page,
            initialState:this.state,
        }).init();
    }
    fetchPosts = async () =>{
        const products = await request();
        this.setState({
            products,
        })
    }
}