const { sql } = require('@vercel/postgres');

exports.fetchText = (req, res) => {
  res.send("Response from the server");
};

exports.selectAll = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM wood_properties;`;
    res.json(data.rows);
  } catch (error) {
    console.log(error);
    res.json({
      message: "error"
    })
  }
};

exports.insertData = async (req, res) => {
  let data = req.body;
  try {
    await sql`INSERT INTO wood_properties (wood_name, wood_type, color, texture, hardness) VALUES (${data.woodName}, ${data.woodType}, ${data.color}, ${data.texture}, ${data.hardness});`; // Vercel sanitizes all queries sent to your Vercel Postgres database before executing them
    res.send("Data inserted");
  } catch (error) {
    console.log(error);
    return response.status(500).send("Something has happened");
  }
};

exports.deleteByName = async (req, res) => {
  let entryName = req.body.woodName;
  try {
    await sql`DELETE FROM wood_properties WHERE wood_name = ${entryName}`;
    res.send(`${entryName} deleted.`);
  } catch (error) {
    console.log(error);
    return response.status(500).send("Soemthing has happened");
  }
};