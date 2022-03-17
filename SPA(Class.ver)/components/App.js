import {initRoute} from '../utils/router.js';
import CartPage from './CartPage.js';
import ProductDetailPage from './ProductDetailPage.js';
import ProductListPage from './ProductListPage.js';
export default class App{
    constructor($target){
        this.$target = $target;
    }
    init = () =>{
        initRoute(this.route);
        this.route();
        window.addEventListener('popstate',this.route);
    }
    route = () =>{
        const {pathname} = location;
        this.$target.innerHTML ='';
        if(pathname === '/web/'){
            new ProductListPage({
                $target: this.$target,
            }).init();
        }
        else if(pathname.split('/')[2] === 'products'){
            const [, , ,productId] = pathname.split('/');
            new ProductDetailPage({
                $target: this.$target,
                productId,
            }).init();
        }
        else if (pathname === '/web/cart'){
            new CartPage({
                $target: this.$target,
            }).init();
        }
    }
}