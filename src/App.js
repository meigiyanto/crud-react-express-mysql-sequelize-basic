import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EditTutorial from './pages/edit-tutorial.component';
import AddTutorial from './pages/add-tutorial.component';
import TutorialsList from './pages/tutorials-list.component';

class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={EditTutorial} />
          </Switch>
        </div>
		  </>
		)
	}
}

export default App;