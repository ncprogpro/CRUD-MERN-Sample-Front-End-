import React from 'react';

class AddPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title   : "",
			content : "",
            tag     : "",
            isTitle : true,
            isContent : true,
            isSuccess : false,
        }
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit( event ) {
        event.preventDefault();

        if( !this.state.title ) 
            this.setState({ isTitle : false });

        if( !this.state.content ) 
            this.setState({ isContent : false });

        if( !this.state.title || !this.state.content )
            return;

        const requestOptions = {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body   : JSON.stringify({ 
                title   : this.state.title,
                content : this.state.content,
                tag     : this.state.tag
            })
        };

        fetch("http://localhost:5000/bulletins", requestOptions)
			.then(res => res.json())
			.then(res => {
                if( res.message === "Success" ) {
                    this.setState({ title   : "" });
                    this.setState({ content : "" });
                    this.setState({ tag     : "" });
                    this.setState({ isSuccess : true });

                    setTimeout(() => {
                        this.setState({ isSuccess : false });
                    }, 3000);
                }
            });
    }

    titleChange({ target: { value } }) {  
        this.setState({ title : value });
        this.setState({ isTitle : true });
    };

    contentChange({ target: { value } }) {  
        this.setState({ content : value });
        this.setState({ isContent : true });
    };

	render() {
        
		return (
            <div className="site-content">
                <div className="container add-post-container">
                    <div className="row">
                        <h2 className="align-center page-title">Add Post</h2>

                        <form onSubmit={ this.handleFormSubmit } className="post-form" >
                            <div className="row">
                                <div className="col-md-12">
                                    <p className={ this.state.isSuccess ? "success" : "hidden" }>
                                        Saved successfully!
                                    </p>
                                </div>

                                <div className="col-md-12">
                                    <input type="text" placeholder="Post Title" value={this.state.title} 
                                        className={ this.state.isTitle ? "" : "invalid" }
                                        onChange={ (e) => this.titleChange(e) }
                                    />
                                    <p className={ this.state.isTitle ? "hidden" : "invalid" }>
                                        Insert a title
                                    </p>
                                </div>

                                <div className="col-md-12">
                                    <select onChange={ e => this.setState({ tag: e.target.value }) }
                                        value={ this.state.tag } >
                                        <option >Select Tag</option>
                                        <option value="tag1">tag 1</option>
                                        <option value="tag2">tag 2</option>
                                        <option value="tag3">tag 3</option>
                                    </select>    
                                </div>

                                <div className="col-md-12">
                                    <textarea type="text" placeholder="Post Content" value={this.state.content} 
                                        className={ this.state.isContent ? "" : "invalid" } rows="5"
                                        onChange={ (e) => this.contentChange(e) }></textarea>
                                    <p className={ this.state.isContent ? "hidden" : "invalid" }>
                                        Insert a content
                                    </p>    
                                </div>

                                <div className="col-md-12">
                                    <input type="submit" className="submit-btn mb-20" value="Save" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
	
		);
	}
}

export default AddPost;
