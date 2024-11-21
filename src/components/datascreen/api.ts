// const API_BASE_URL = 'https://api.example.com';

// export const api = {
//   // Get all data
//   getData: async () => {
//     const response = await fetch(`${API_BASE_URL}/data`);
//     if (!response.ok) throw new Error('Failed to fetch data');
//     return response.json();
//   },

//   // Post new data
//   postData: async (data: any) => {
//     const response = await fetch(`${API_BASE_URL}/data`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) throw new Error('Failed to post data');
//     return response.json();
//   },

//   // Delete all data
//   deleteAllData: async () => {
//     const response = await fetch(`${API_BASE_URL}/data`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) throw new Error('Failed to delete data');
//     return response.json();
//   },
// };
