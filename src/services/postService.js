import axios from "axios";



class Post{
    create(formData)
    {
        const url = "http://localhost:8002/api/create-post";
        const config = 
        {
            headers:
            {
                'content-type':'multipart/form-data',
            }
        };
        return axios.post(url,formData,config);
    }
    getPosts()
    {
        const url = "http://localhost:8002/api/get-posts";
        return axios.get(url);

    }
    deletePost(id)
    {
        const url = "http://localhost:8002/api/delete-post/"+id ;
        return axios.delete(url);

    }
    updatePost(id, data) {
        const url = `http://localhost:8002/api/update-post`;
        return axios.post(url, { id, ...data });
    }
}

export default new Post();