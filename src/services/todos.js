import api from "./api.js";

export default class Todos {
    static async create(description) {
        try {
            const response = await api('/todo', { method: 'POST', body: JSON.stringify({ description: description }) });
            return response;
        } catch (e) {
            return null;
        }
    }

    static async getById(id) {
        const response = await api('/todo/' + id, { method: 'GET' });
        return response.data;
    }

    static async getAll() {
        try {
            const response = await api('/todo');
            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e);
            // если запрос выполнился не оч хорошо, то выполняем его ещё раз
            return Todos.getAll();
        }

    }

    static async updateStatusById(id, completed) {
        try {
            const response = await api('/todo/' + id, { method: 'PUT', body: JSON.stringify({ completed: completed }) });
            return response;
        } catch (e) {
            return null;
        }

    }

    static async deleteById(id) {
        try {
            return await api('/todo/' + id, { method: 'DELETE' });;
        } catch (e) {
            // такая же логика как и в getAll
            return Todos.deleteById(id);
        }
    }
}