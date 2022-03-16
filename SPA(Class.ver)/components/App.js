import {initRoute} from '../utils/router.js'
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
        this.$target.innerHTML = '';
        const {pathname} = location;
        if(pathname === '/web/'){
           new ProductListPage({
               $target : this.$target,
           }).init();
        }
        else if(pathname.split('/')[2] === 'products'){
            const [ , , ,productId] = pathname.split('/');
            new ProductDetailPage({
                $target : this.$target,
                productId,
            }).init();
        }
    }
    
}