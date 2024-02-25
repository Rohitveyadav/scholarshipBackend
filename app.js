const app = require('./server');
const pool = require('./dbconnection');


app.get('/courses', async (req, res) => {
    try {


        let sql = `
    SELECT DISTINCT c.*
    FROM Course c
    INNER JOIN University u ON c.university_id = u.university_id
    INNER JOIN EducationLevel el ON c.level_id = el.level_id
    INNER JOIN Country co ON u.country_id = co.country_id
  `;


        const {
            name,
            level,
            country
        } = req.query;

        const values = [];
        const conditions = [];

        if (name) {
            conditions.push('(c.course_name LIKE ? OR u.university_name LIKE ?)');
            values.push(`%${name}%`, `%${name}%`);
        }

        if (level) {
            conditions.push('el.level_name LIKE ?');
            values.push(`%${level}%`);
        }

        if (country) {
            conditions.push('co.country_name LIKE ?');
            values.push(`%${country}%`);
        }


        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' OR ');
        }

        // Get data from the database
        const [rows] = await pool.query(sql, values);
        res.json(rows);

    } catch (error) {
        console.error('Error retrieving courses:', error);
        res.status(500).send('Internal Server Error');
    }
});