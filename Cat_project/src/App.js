import Nodes from './components/Nodes';
import Breadcrumb from './components/Breadcrumb';
import {request} from './utills/api';
import ImageView from './components/ImageView';

export default function App($app){
    
    this.state ={
        isRoot : false,
        depth:[],
        nodes:[],
        selectedFilePath : null,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        nodes.setState({
            isRoot:this.state.isRoot,
            nodes : this.state.nodes,
        })
        breadcrumb.setState(this.state.depth);
        imageView.setState(this.state.selectedFilePath)

    }
    const imageView = new ImageView({$app,initialState:this.state.selectedFilePath})
    const nodes = new Nodes({
        $app,
        initialState:[],
        onClick : async (node) => {
            try{
                if(node.type === 'DIRECTORY'){
                    const nextNodes = await request(node.id);
                    this.setState({
                        ...this.state,
                        nodes:nextNodes,
                        depth:[...this.depth,node]
                    })
                }
                else if(node.type ==='FILE'){
                    const filePath = node.filePath;
                    this.setState({
                        ...this.state,
                        selectedFilePath:filePath,
                    })

                }

            }catch(e){

            }
        },
        onBackClick: async () =>{
            try{
            const nextState = {...this.state};
            nextState.depth.pop();
            const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length -1].id;
            if(prevNodeId === null){
                const rootNodes = await request();
                this.setState({
                    ...nextState,
                    isRoot:true,
                    nodes:rootNodes,
                })
            }
            else{
                const prevNodes = await request(prevNodeId);
                this.setState({
                    ...nextState,
                    isRoot:false,
                    nodes:prevNodes
                })
            }
        }catch(e){

        }

        }

    })
    const breadcrumb = new Breadcrumb({
        $app,
        initialState:[],
        depth:this.state.depth,
        onClick : async (index) =>{
            try{
                if(index === null){
                const rootNodes = await request();
                this.setState({
                    ...this.state,
                    depth:[],
                    nodes:rootNodes,
                })
                return;
              }
                if(index === this.state.depth.length -1) return;

                const nextState = {...this.state};
                const nextDepth = nextState.depth.slice(0,index+1);
                const prevNodeId = nextDepth[nextDepth.length-1].id;
                const prevNodes = await request(prevNodeId);
                this.setState({
                    ...nextState,
                    depth:nextDepth,
                    node:prevNodes
                })
            }
            catch(e){

            }

        }
    })
    const init = async () =>{
        const rootNodes = await request();
        this.setState({
            ...this.state,
            nodes:rootNodes
        })
    }
    init();
}