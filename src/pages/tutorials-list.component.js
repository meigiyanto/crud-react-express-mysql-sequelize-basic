import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
		this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
   TutorialDataService.getAll()
     	.then(response => {
       	this.setState({
         	tutorials: response.data
       	});
       	// console.log(response.data);
     	})
      .catch(e => {
        console.log(e);
    	});
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    if(window.confirm('Are you sure want delete all tutorial lists?') === true) {
		TutorialDataService.deleteAll()
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
    } else {
			alert('Delete cancelled!');
		}
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

	deleteTutorial() {
		if(window.confirm(`Are you sure want ro delete ${this.state.currentTutorial.title}?`) === true) {
			TutorialDataService.delete(this.state.currentTutorial.id)
	    .then(response => {
				console.log(response.data);
				alert('Data has been deleted successfully!');
			})
			.catch(e => {
				console.log(e);
			});
		} else {
			alert('Delete Cancelled!');
		}
	}

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="row">
        <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={this.onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.searchTitle}
          >
            Search
          </button>
        </div>
			</div>
			<div className="col-md-12">
				<Link className="float-right btn btn-sm btn-success" to={"/add"}>Add Tutorial
				</Link>
			</div>
			<div className="col-md-6">
				<h4>Tutorials List</h4>
				<p>Please click on a Tutorial below</p>
          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="my-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6 mt-3">
          {currentTutorial ? (
            <div>
              <h4>{currentTutorial.title}</h4>
					    <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
							<div>
  							<label>
    							<strong>Created At :</strong>
  							</label>{" "}
  							{currentTutorial.createdAt}
							</div>
							<div>
  							<label>
    							<strong>Updated At :</strong>
  							</label>{" "}
  							{currentTutorial.updatedAt}
						  </div>
              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="btn btn-sm btn-warning"
              >Edit Detail</Link>{" "}
							<button type="button" className="btn btn-sm btn-danger float-right" onClick={this.deleteTutorial}>Delete</button>
            </div>
          ) : (
            <div>
              <br />
					  	<p></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TutorialsList;