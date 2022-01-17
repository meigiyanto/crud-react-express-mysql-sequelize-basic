import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TutorialDataService from "../services/tutorial.service";

class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    // this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
		return (
			<div>
        {this.state.submitted ? (
          <div>
            <h4 className="text-center">Tutorial has been created successfully!</h4>
            <Link to={"/"}>View All Tutorial </Link>
          </div>
        ) : (
				<div className="card">
					<div className="card-header">
						<h3 className="card-title">Create New Tutorial</h3>
					</div>
					<div className="card-body">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>
						<div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-sm btn-success">
              Submit
            </button>
						<Link className="float-right btn btn-sm btn-secondary" to={"/"}>Go Back</Link>
          </div>
				</div>
        )}
      </div>
		);
	}
}
export default AddTutorial;