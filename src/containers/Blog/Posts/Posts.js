import React, { Component } from "react";

import axios from "../../../axios";

import Post from "../../../components/Post/Post";
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
    this.setState({
      selectedPostId: id,
    });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something wents wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedhandler(post.id)}
          />
        );
      });
    }

    return (
      <section>
        <section className="Posts">{posts}</section>
      </section>
    );
  }
}

export default Posts;