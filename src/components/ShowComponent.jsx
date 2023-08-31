import React, { useState, useEffect } from "react";
import postService from "../services/postService";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function ShowComponent() {
    const [posts, setPosts] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    const fetchPosts = async () => {
        const response = await postService.getPosts();
        setPosts(response.data.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (id) => {
        const response = await postService.deletePost(id);
        if (response.data.success === true) {
            setPosts(posts.filter(post => post._id !== id));
            alert(response.data.msg);
        } else {
            alert(response.data.msg);
        }
    };

    const addToFavorites = async (id) => {
        try {
            const response = await postService.updatePost(id, { isFavorite: true });
            if (response.data.success === true) {
                fetchPosts();
                alert("Added to favorites successfully!");
            } else {
                alert("Failed to add to favorites.");
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };
    const filteredPosts = showFavorites ? posts.filter(post => post.isFavorite) : posts;

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Photo App</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${!showFavorites ? 'btn-primary' : 'btn-light'}`}
                                onClick={toggleFavorites}>
                                All Photos
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${showFavorites ? 'btn-primary' : 'btn-light'}`}
                                onClick={toggleFavorites}>
                                Favorites
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="card-container d-flex flex-wrap justify-content-between">
                {filteredPosts.map(post => (
                    <div key={post._id} className="card mb-4" style={{ maxWidth: "250px" }}>
                        <img src={'http://localhost:8002/api/postImages/' + post.image} className="card-img-top" alt="Post" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.date}</p>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <button onClick={() => deletePost(post._id)} className="btn btn-danger">Delete</button>
                                {!post.isFavorite && (
                                    <button onClick={() => addToFavorites(post._id)} className="btn btn-primary">Add to Favorites</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ShowComponent;
