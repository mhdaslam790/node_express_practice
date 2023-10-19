import express from 'express';
import Joi from 'joi';
import 'dotenv/config';
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: 'math' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Physics' },
];

app.get('/', (req, res) => {
    console.log(port);
    res.send('Hello My World');
});
app.get('/api/courses/', (req, res) => {

   
    res.json({status:200,
        data: courses});
});
app.get('/api/course/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID not found');

    }
    res.json({status:200,
        data: course});
});
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});
app.post('/api/course', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error);
        return;
    }
    const course = {
        id: courses.length + 1, name: req.body.name,
    };
    courses.push(course);
    res.status(201).json({
        message: "success",
        data: course,
    });
});
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID not found');

    }

    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error);

    }
    course.name = req.body.name;
    res.send(course);

});
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID not found');

    }

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    res.send(course).send('Deleted');

});

function validateCourse(course) {
    const schemaa = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schemaa.validate(course);


}
app.listen(port, () => console.log(`listening on port ${port}.`));