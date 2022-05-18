import {fetchLanguages} from '../utils/api.js'
import SearchInput from "./SearchInput.js";
import Suggestion from './Suggestion.js';
import SelectedLanguage from './SelectedLanguage.js';

export default function App({$target}){

    this.state = {
        fetchLanguages : [],
        selectedLanguages : [],
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        suggestion.setState({
            ...suggestion.state,
            items : this.state.fetchLanguages,
            selectedIndex: 0,
        })
        selectedLanguage.setState(this.state.selectedLanguages)
    }
    const selectedLanguage = new SelectedLanguage({
        $target,
        initialState:[],
    })

    const searchInput = new SearchInput({
        $target,
        initialState:'',
        onChange: async (keyword) =>{
            if(keyword.length === 0){
                this.setState({
                    ...this.state,
                    fetchLanguages:[],
                })
                
                return;
            }
            // console.log('input delay checked');
            const languages = await fetchLanguages(keyword);
            if(languages.length >= 0){
                this.setState({
                    ...this.state,
                    fetchLanguages : languages,
                })
            }else{
                this.setState({
                    ...this.state,
                    fetchLanguages : [],
                })
            }
        }
    })
    const suggestion = new Suggestion({
        $target,
        initialState:{
            items: [],
            selectedIndex : 0,
        },
        onSelect : (language) =>{
            alert(language);
            const MAX_COUNT = 5;
            const nextSelectedLanguages = [...this.state.selectedLanguages];
            const index = nextSelectedLanguages.indexOf(language);
            if(index > -1){
                nextSelectedLanguages.splice(index,1);
                
            }else{
                if(MAX_COUNT === nextSelectedLanguages.length)
                nextSelectedLanguages.splice(0,1);
            }
            nextSelectedLanguages.push(language);
            this.setState({
                ...this.state,
                selectedLanguages : nextSelectedLanguages,
            })
        }
    })

}