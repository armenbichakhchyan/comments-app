import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
});

class ApiClient {
    static async  getComments() {
        const res =await  api.get('/comments');
        return res.data;
    }

    static async  deleteComment(id: number) {
        await api.delete(`/comments/${id}`);
        return id;
    }

    static async addComment(addFormData: {name:string, email:string, body:string}) {
        const res = await api.post('/comments/', addFormData);
        return res.data;
    }

    static async editComment(editData: {id:number, name:string, email:string, body:string}) {
        const res = await api.put(`/comments/${editData.id}`, {
            name: editData.name,
            email: editData.email,
            body: editData.body,
        });
        return res.data;
    }
}

export default ApiClient;
