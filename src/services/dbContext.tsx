// import {useEffect, useState} from 'react';
// import SQLite from 'react-native-sqlite-storage';
// export const useDatabase = () => {
//   const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
//   const [isDbReady, setIsDbReady] = useState<boolean>(false);

//   useEffect(() => {
//     // Open the database when the hook is initialized
//     const openDatabase = () => {
//       const database = SQLite.openDatabase(
//         {
//           name: 'appDatabase.db',
//           location: 'default',
//         },
//         () => {
//           console.log('Database opened');
//           setDb(database);
//           setIsDbReady(true);
//         },
//         error => {
//           console.error('Database error:', error);
//         },
//       );
//     };

//     openDatabase(); // Open the database on mount

//     return () => {
//       // Clean up by closing the database on unmount
//       if (db) {
//         db.close();
//         console.log('Database closed');
//       }
//     };
//   }, []);

//   return {db, isDbReady};
// };
