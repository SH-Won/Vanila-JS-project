export default function Breadcrumb({$app,initialState,onClick}){
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';
    $app.appendChild(this.$target);
    
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        this.$target.innerHTML =`<div class="nav-item>root</div>${
        this.state.map((node,index) => `<div class="nav-item" data-index="${index}">${node.name}</div>`).join('')}`
        
    }
    this.$target.addEventListener('click',(e)=>{
        const $navItem = e.target.closest('.nav-item');
        if($navItem){
            const {index} = $navItem.dataset;
            this.onClick(index ? +index : null);
        }

    })
    this.render();
}
//클로저 - 함수와 함수가 선언된 렉시컬 환경의 조합
//        만약 외부함수가 내부함수를 반환하여 실행이 종료되어도 반환된 내부함수는
//        이미 소멸된 외부함수의 지역변수에 접근 할수 있다.
//        장점 - 최신상태를 유지 할 수 있다, 오직 클로저만이 외부함수의 지역변수에 접근 할수 있다.
//        단점 - 메모리누수의 문제가 생긴다.