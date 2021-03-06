import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TutorialDataService from "../services/tutorial.service";

class EditTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
				createdAt: "",
				updatedAt: ""
      },
      message: ""
    };
  }

	componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

	onChangeDescription(e) {
    const description = e.target.value;
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

	updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,      description: this.state.currentTutorial.description,
      published: status,
			createdAt: this.state.createdAt,
		  upatedAt: this.state.updatedAt
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

	updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

	render() {
		const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
				<div className="card mt-3">
					<div className="card-header">
						<h3>Edit Tutorial</h3>
					  <Link className="float-right btn btn-sm btn-secondary" to={"/"}>Go Back</Link>
					</div>
				  <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
							<div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status : </strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
{currentTutorial.published ? (
              <button
                className="btn btn-sm btn-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >Unpublish</button>
            ) : (
              <button
                className="btn btn-sm btn-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >Publish</button>
            )}
					  <button
              type="submit"
              className="float-right btn btn-sm btn-success"
              onClick={this.updateTutorial}
            >Update</button>
            <p>{this.state.message}</p>
          </div>
				</div>
			</div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
	}
}

export default EditTutorial;