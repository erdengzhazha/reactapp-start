// import logo from './logo.svg';
import React from 'react'
import './App.css';
import './Table';
import Table from "./Table";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.陈炜
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App extends React.Component{
    render() {
        const heading = <h1 className="site-heading">Hello, React</h1>
        const characters = [
            {
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                name: 'Dennis',
                job: 'Bartender',
            },
        ]
        return (
            <div className={"app"}>
                <h1>Hello,React!</h1>
                {heading}
            </div>,
            <div className={"container"}>
              <Table characterData={characters}></Table>
            </div>
        );
    }
}

export default App;
