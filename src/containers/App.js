import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import './App.css';
import Scroll from '../components/Scroll'

class App extends Component {
    constructor() {     //app component that has 2 states, robots and searchfields
            super()     //because app owns the state, any component that has state uses the "class" syntax.
            this.state = {  //so they can use the constructor function to create this.state, and this "state" is what changes the app
                robots: [],
                searchfield: ''
        }
    }       //the class can pass down things such as props
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })  //we passed down onSearchChange to the Searchbox
    }                                                       //and the SearchBox, everytime there is an onChange on the input
    //lets the app know there was a change, and to run this function, then runs the function with the event and update the state of teh searchField to whatever we type
    //with the information we have in teh searchbox we can now communicate to the card list and tell it to filter the robot state to now have onyl include what is in the serachfield
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json()) //fetch whatever the users are
            .then(users => this.setState( { robots: users }));  //wee are getting a response through json and updating the users with setState
    }
    render() {  
        const { robots, searchfield } = this.state;                                            
            const filteredRobots = robots.filter(robots => { 
                return robots.name.toLowerCase().includes(searchfield.toLowerCase());
            })
            return !robots.length ?
                <h1>Loading...</h1> :
                (
                    <div className='tc'>
                        <h1 className='f1'>RoboFriends</h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <Scroll>
                            <CardList robots={filteredRobots}/>
                        </Scroll>
                    </div>
                );
            }
}

export default App;