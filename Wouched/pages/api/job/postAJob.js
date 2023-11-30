import Joi from 'joi';

const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    user: Joi.required(),
    email: Joi.string().email().required(),
    company: Joi.string().required(),
    job_category: Joi.string().required(),
    job_type: Joi.string().required(),
    job_experience: Joi.string().required(),
    job_vacancy: Joi.number().required(),
    job_deadline: Joi.date().required(),
    salary: Joi.number().required(),
});

export default async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            await validateToken(req, res, async () => {
                await postAJob(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}

const postAJob = async (req, res) => {
    const data = req.body;
    const { error } = schema.validate(data);

    if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.token}` 
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const responseData = await response.json();
        return res.status(200).json({ success: true, message: "Job Posted Successfully !", data: responseData });
    } catch (error) {
        console.log('Error in posting a job (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong!" })
    }
}
