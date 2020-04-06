import React from 'react';
import logo from '../../logo.svg';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            allBulletins: "",
            orderBy  : "default",
            filterBy : "all",
            sort     : "down" 
		}
	}

	componentDidMount() {
		this.allBulletins();
	}

	allBulletins() {
		fetch("http://localhost:5000/bulletins")
			.then(res => res.json())
			.then(res => this.setState({ allBulletins: res }));
    }
    
    deletePost(id) {
        const requestOptions = {
            method : 'DELETE',
        };

        fetch("http://localhost:5000/bulletins/" + id, requestOptions)
			.then(res => res.json())
			.then(res => {
                if( res.message === "Success" ) {
                    this.allBulletins();
                }
            });
    }

    upvote(postId, val, key) {
        if( val == 1 ) 
            return;

        fetch("http://localhost:5000/bulletins/" + postId + "/upvote")
			.then(res => res.json())
			.then(res => {
                // this.state.allBulletins[key] = res;
                // this.setState({ allBulletins : this.state.allBulletins });
                this.filterAndOrder(this.state.filterBy, this.state.orderBy);
            });
    }

    downvote(postId, val, key) {
        if( val == 1 ) 
            return;

        fetch("http://localhost:5000/bulletins/" + postId + "/downvote")
			.then(res => res.json())
			.then(res => {
                // this.state.allBulletins[key] = res;
                // this.setState({ allBulletins : this.state.allBulletins });
                this.filterAndOrder(this.state.filterBy, this.state.orderBy);
            });
    }

    handleFilter({ target: { value } }) {
        this.setState({ filterBy : value });
        this.filterAndOrder(value, this.state.orderBy, this.state.sort);
    }

    handleOrder({ target: { value } }) {
        this.setState({ orderBy : value });
        this.filterAndOrder(this.state.filterBy, value, this.state.sort);
    }

    handleSortUp() {
        if( this.state.sort != "up" ) {
            this.setState({ sort : "up" });
            this.filterAndOrder(this.state.filterBy, this.state.orderBy, "up");
        }
            
    }

    handleSortDown() {
        if( this.state.sort != "down" ) {
            this.setState({ sort : "down" });
            this.filterAndOrder(this.state.filterBy, this.state.orderBy, "down");
        }
    }

    filterAndOrder(filterBy, orderBy, sort) {

        const requestOptions = {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body   : JSON.stringify({ 
                filterBy : filterBy,
                orderBy  : orderBy,
                sort     : sort
            })
        };

        fetch("http://localhost:5000/bulletins/filter_and_order", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({ allBulletins: res }));
    }

	render() {
		let allBulletins = [];
		if( this.state.allBulletins ) 
            allBulletins = this.state.allBulletins;

		console.log("====", allBulletins);
		
		return (
            <div className="site-content">
                <div className="container bulletins-container">
                    <div className="row content-header">
                        <div className="left col-md-6 align-left">
                            <a href="/add">Add Post</a>
                        </div>

                        <div className="right col-md-6 align-right">
                            <span>Filter By </span>
                            <select onChange={ e => this.handleFilter(e) }>
                                <option value="all">Tag</option>
                                <option value="tag1">Tag 1</option>
                                <option value="tag2">Tag 2</option>
                                <option value="tag3">Tag 3</option>
                            </select>

                            <span>Order By </span>
                            <select onChange={ e => this.handleOrder(e) }>
                                <option value="default">Default</option>
                                <option value="popularity">Popularity</option>
                                <option value="title">Title</option>
                                <option value="date">Date</option>
                            </select>

                            <span className="sort">
                                <i className={ this.state.sort == "up" ? "fa fa-sort-up active" : "fa fa-sort-up" } 
                                    onClick={ () => this.handleSortUp() }></i>
                                <i className={ this.state.sort == "down" ? "fa fa-sort-down active" : "fa fa-sort-down" } 
                                    onClick={ () => this.handleSortDown() }></i>
                            </span>
                        </div>
                    </div>

                    <div className="row">
                    {
                        allBulletins.map((item, key) => {
                            return (
                                <div key={`key-${key}`} className="col-md-4">
                                    <div className="item">
                                        <img src={logo} alt="post-logo" />
                                        <h4>{ item["title"] }</h4>
                                        <div className="item-content">{ item["content"] }</div>
                                        { item["tag"] &&
                                            <div>Tag : { item["tag"] }</div> 
                                        }
                                        <div className="item-action">
                                            <div className="left">
                                                <i className="fa fa-thumbs-up" 
                                                    onClick={ () => this.upvote( item["_id"], item["upvote"], key ) }> : { item["upvote"] }</i> &nbsp;
                                                <i className="fa fa-thumbs-down color-danger" 
                                                    onClick={ () => this.downvote( item["_id"], item["downvote"], key ) }> : { item["downvote"] }</i> 
                                            </div>
                                            <div className="right">
                                                <Link 
                                                    className="edit"
                                                    to={{ pathname: "/edit", postId: item["_id"] }}
                                                >EDIT</Link> &nbsp;
                                                <a onClick={() => this.deletePost(item["_id"])} className="color-danger">
                                                    DELETE
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
	
		);
	}
}

export default Homepage;
