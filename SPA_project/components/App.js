import CartPage from './CartPage';
import ProductDetailPage from './ProductDetailPage';
import ProductListPage from './ProductListPage';


export default function App({$target}){
    
    this.route = () =>{
        const {pathname} = location;
        $target.innerHTML = '';
        if(pathname ==='/'){
            new ProductListPage({$target}).render();
        }
        else if(pathname.includes('/products/')){
            const [, ,productId] = pathname.split('/');
            new ProductDetailPage({
                $target,
                productId
            }).render();
        
        }
        else if(pathname ==='/cart'){
            new CartPage({
                $target,
            }).render();
        }
    }
    this.route();
}

