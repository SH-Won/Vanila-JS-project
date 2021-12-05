import {request} from '../utils/api';
import ProductList from './ProductList';
export default function ProductListPage({$target,}){
    this.state ="";
    const $page = document.createElement('div');
    
    $page.className = "ProductListPage";
    $page.innerHTML = `<h1>상품 목록</h1>`

    this.render = () =>{
        $target.appendChild($page);
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
        productList.setState(this.state);
    }
    const fetchProducts = async () =>{
        const products = await request('/products');
        this.setState(products);
    }
    const productList = new ProductList({
        $target : $page,
        initialState :this.state,
    })
    fetchProducts();
}