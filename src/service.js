import axios from 'axios';

//axios.defaults.baseURL = "http://localhost:5096";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  (response) => response,  // החזרת ה-response כפי שהוא אם הוא הצליח
  (error) => {  // אם יש שגיאה, נבצע את הקוד כאן
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);  // זורקים את השגיאה כדי שנוכל לטפל בה במקום אחר
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
    try {
      // שליחה של שם המשימה כאובייקט JSON
      const response = await axios.post(`/Item`, { name: name }, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data;  // החזרת הפריט שנוצר
    } catch (error) {
      console.error('Error in addTask:', error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
        // Sending the isComplete value in the request body
        const response = await axios.put(`/Item/${id}`, null, {
            params: { isComplete: isComplete }, // Sending `isComplete` as a query parameter
        });

        return response.data; // Return the updated item from the server
    } catch (error) {
        console.error('Error in setCompleted:', error);
        throw error; // Re-throw the error to handle it in the UI
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    
    try {
        await axios.delete(`/Item/${id}`);
        console.log(`Task with ID ${id} was successfully deleted`);
    } catch (error) {
        console.error('Error in deleteTask:', error);
        throw error;
    }
  }
};
