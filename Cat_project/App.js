import Nodes from './components/Nodes';
import Breadcrumb from './components/Breadcrumb';
import {request} from './utills/api'
import ImageView from './components/ImageView';
import Loading  from './utills/Loading';
const cache = {

}

export default function App($app){
    this.state = {
        isRoot: false,
        nodes:[],
        depth:[],
        selectedFilePath : null,
        isLoading : true,
    }
    const loading = new Loading({$app,initialState:this.state.isLoading});
    
    const nodes = new Nodes({
        $app,
        initialState:{
            isRoot : this.state.isRoot,
            nodes :  this.state.nodes,
        },
        onClick : async (node) =>{
            try{
            if(node.type === 'DIRECTORY'){
                if(cache[node.id]){
                    this.setState({
                        ...this.state,
                        depth:[...this.state.depth,node],
                        node:cache[node.id],
                    })
                }else{
                const nextNodes = await request(node.id);
                this.setState({
                    ...this.state,
                    depth:[...this.state.depth,node],
                    nodes:nextNodes,
                })
                cache[node.id] = nextNodes
            }

            }
        
            else if (node.type === 'FILE'){
                this.setState({
                    ...this.state,
                    selectedFilePath : node.filePath,
                })

            }
        }catch(e){

        }
        },
        onBackClick : async () =>{
            try{
                const nextState = {...this.state};
                nextState.depth.pop();
                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length-1].id;
                if(prevNodeId === null){
                    // const rootNodes = await request();
                    this.setState({
                        ...nextState,
                        isRoot:true,
                        nodes :cache[root]
                    })
                }else{
                    // const prevNodes = await request(prevNodeId);
                    this.setState({
                        ...nextState,
                        isRoot:false,
                        nodes:cache[prevNodeId]
                    })
                }

            }catch(e){

            }

        }

    })
    const breadcrumb = new Breadcrumb({
        $app,
        initialState:[],
        onClick:(index) =>{
            if(index === null){
                this.setState({
                    ...this.state,
                    depth:[],
                    nodes:cache[root],
                })
                return;
            }
            if(index === this.state.depth.length - 1){
                return;
            }
            const nextState = {...this.state};
            const nextDepth = nextState.depth.slice(0,index+1);
            this.setState({
                ...this.state,
                depth: nextDepth,
                nodes:cache[nextDepth[nextDepth.length-1].id],
            })
        }

    })
    const imageView = new ImageView({
        $app,
        initialState : this.state.selectedFilePath,
    })
    
    this.setState = (nextState) =>{
        this.state = nextState;
        nodes.setState({
            isRoot : this.state.isRoot,
            nodes : this.state.nodes,
        });
        breadcrumb.setState(this.state.depth);
        imageView.setState(this.state.selectedFilePath);
        loading.setState(this.state.isLoading);
    }
    const init = async () =>{
        try{
            const rootNodes = await request();
            this.setState({
                ...this.state,
                isRoot:true,
                nodes:rootNodes,
            })
            cache[root] = rootNodes;
        }catch(e){
        
        }
    }
    init();
}