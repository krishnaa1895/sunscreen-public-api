import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const yourAPIKey = "openuv-4px2z0rlyfjm2wn-io";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs",{uv:null});
});

app.post("/submit", async (req, res) => {
    const { lat, long } = req.body;
    try {
        const result = await axios.get("https://api.openuv.io/api/v1/uv", {
            headers: { "x-access-token": yourAPIKey },
            params: {
                lat: lat,
                lng: long,
                alt: 0,  
                date: new Date().toISOString()  
            }
        });
        res.render("sun.ejs", { uv: result.data.result.uv });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the data.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
