import { Link } from 'react-router-dom';

function Navbar() {
	return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
        	<a href="/#" className="navbar-brand">Denmasgie</a>
					<button
						className="navbar-toggler"
						type="button"
				    data-toggle="collapse"
				   	data-target="#navbarContent"
						aria-controls="navbarContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
    			<span className="navbar-toggler-icon"></span>
  				</button>
					<div
						className="collapse navbar-collapse"
						id="navbarContent">
        		<ul className="navbar-nav mr-auto">          		 <li className="nav-item">
             		<Link to={"/tutorials"} className="nav-link">Tutorials
            		</Link>
          		</li>
							<li className="nav-item">
								<Link className="nav-link" to={"/"}>Link 1</Link>
							</li>
					  </ul>
					</div>
        </div>
      </nav>
	)
}

export default Navbar;