import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';  
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchFild, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters]= useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  console.log('rendered');

  useEffect (() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users)=> setMonsters(users))
  }, []);
  
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchFild);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchFild]);

  const onSearchChange = (event) => {
    const searchFildString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFildString);
  };
  
  return(
    <div classname='app'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      
      <SearchBox
        className='monsters-search-box'
        onChangeHandler = {onSearchChange}
        placeHolder= 'search monster'
      />
      
      <CardList monsters = {filteredMonsters}/>
    </div>
  )
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchFild: '',      
//     };
    
//   }  

//   componentDidMount() {
    
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users)=>
//         this.setState(
//           () => {
//             return {monsters: users};
//           },
          
//         )
//       );  
//   }

//   onSearchChange = (event) => {
//     const searchFild =  event.target.value.toLocaleLowerCase();
//     this.setState (()=> {
//       return { searchFild };
//     });          
//   };

//   render() {
//     console.log('render from AppJS')

//     const { monsters, searchFild } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchFild);
//     });

//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox 
//           className = 'monsters-search-box'
//           onChangeHandler = {onSearchChange} 
//           placeholder = 'Search Monsters'
//         />
//         <CardList monsters = {filteredMonsters}/>      
      
//       </div>
//     );

//   }     
  
// }

export default App;