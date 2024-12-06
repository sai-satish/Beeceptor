const mysql = require('mysql2');

function execute_query(query, callback) {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'SaiTeja@123.',
        database: process.env.DB_DATABASE || 'website_details',
        port: process.env.DB_PORT || 3306,
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            callback(err, null);
            return;
        }
        // console.log('Connected to MySQL as ID ' + connection.threadId);
    });

    connection.query(query, (err, result) => {
        if (err) {
            console.error('Query execution failed:', err);
            callback(err, null);
        } else {
            callback(null, result);
        }
        connection.end();
    });
}

function connect_to_API(endpoint, data) {
    // console.log("In connect_to_API, received data:", data);

    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }
            return response.json();
        })
        .then((apiResponse) => {
            // console.log("API Response:", apiResponse);

            return new Promise((resolve, reject) => {
                execute_query(apiResponse.query, (err, result) => {
                    if (err) {
                        console.error("Query execution error:", err);
                        return reject(err);
                    }

                    // console.log("Query executed successfully:", result);
                    if (result.length === 0 || result[0]?.pass !== data.pwd) {
                        resolve({ status: false });
                    } else {
                        resolve({ status: true });
                    }
                });
            });
        })
        .catch((error) => {
            console.error("Error in connect_to_API:", error);
            throw error;
        });
}

module.exports = { execute_query, connect_to_API };
