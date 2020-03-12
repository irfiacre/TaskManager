import pool from "../config/db_config";

export default class TaskController {

    static async getCollection(req, res) {
        // Setup SQL query
        let queryTaskReadAll = `SELECT * FROM tasks;`;

        try {
            // Execute the SQL query
            const result = await pool.query(queryTaskReadAll);

            return res.status(200).json({
                status: 200,
                data: result.rows,
            });

        } catch (error) {}
    }

    static async create(req, res) {

        // Get resource (Task) data passed in the request body
        const { title, description, scheduleDate, dueDate } = req.body;

        // Setup SQL query
        let queryTaskInsert = `INSERT INTO tasks (title, description, schedule_date, due_date) 
    VALUES ($1, $2, $3, $4) RETURNING *;`;

        try {
            // Execute the SQL query
            const { rows } = await pool.query(queryTaskInsert, [title, description, scheduleDate, dueDate]);

            return res.status(201).json({
                status: 201,
                message: 'Task created successfully',
                data: rows[0],
            });

        } catch (error) {}
    }

    static async delete(req, res) {
        // Setup SQL query
        let queryTaskDelete = `DELETE FROM tasks WHERE id = $1;`;

        try {

            if (isNaN(req.params.id)) {
                return res.status(400).json({
                    status: 400,
                    error: 'Task ID must be an integer',
                });
            }

            // Execute the SQL query
            const result = await pool.query(queryTaskDelete, [req.params.id]);

            if (result.rowCount <= 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'Task does not exist',
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'Task deleted successfully',
            });

        } catch (error) {}
    }

    static async View(req, res) {
        let result;
        let queryTaskReadAll;
        try {
            if (req.query.taskid) {

                if (isNaN(req.query.taskid)) {
                    return res.status(400).json({
                        status: 400,
                        message: "Task Id shoud Be an Integer"
                    })
                }

                queryTaskReadAll = `SELECT * FROM tasks where id='${req.query.taskid}';`;
                result = await pool.query(queryTaskReadAll);

            } else {

                queryTaskReadAll = `SELECT * FROM tasks;`;
                result = await pool.query(queryTaskReadAll)
            }
            if (!result.rows[0]) {
                return res.status(404).json({
                    status: 404,
                    error: "No Task Found"
                });
            }
            return res.status(200).json({
                status: 200,
                data: result.rows,
            });
        } catch (err) {}
    }
    static async update(req, res) {
        // Setup SQL query
        let queryTaskDelete = `UPDATE tasks SET status=$1 WHERE id = $2;`;

        try {

            if (isNaN(req.params.id)) {
                return res.status(400).json({
                    status: 400,
                    error: 'Task ID must be an integer',
                });
            }

            // Execute the SQL query
            const result = await pool.query(queryTaskDelete, [req.params.id]);

            if (result.rowCount <= 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'Task does not exist',
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'Task deleted successfully',
            });

        } catch (error) {}
    }

}