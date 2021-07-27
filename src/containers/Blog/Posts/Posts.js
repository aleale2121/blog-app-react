import React, { Component } from "react";
import axios from "../../../axios";
import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";

import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";
class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedpPosts = posts.map((post) => {
          return {
            ...post,
            author: "Alefew",
          };
        });
        this.setState({
          posts: updatedpPosts,
        });
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ error: true });
      });
  }

  

  postSelectedhandler = (id) => {
    // this.setState({
    //   selectedPostId: id,
    // });
    // both of the ff works
    // this.props.history.push({ pathname: "/posts/" + id });
    this.props.history.push("/posts/" + id );
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something wents wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={"/posts" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedhandler(post.id)}
          />
          // </Link>
        );
      });
    }

    return (
      <div>
        <section>
          <section className="Posts">{posts}</section>
        </section>
        <Route path={this.props.match.url+"/:id"} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
