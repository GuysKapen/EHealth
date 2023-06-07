
import express from 'express';

import answers from './answers';
import posts from './posts';
import recruitments from './recruitments';
import users from './users';
import docSpecialized from './doctor_specialized';
import drugs from './drugs';
import chiefComplaint from './chief_complaint';
import comorbidities from './comorbidities';
import provisionalDiagnosis from './provisional_diagnosis';
import differentialDiagnosis from './differential_diagnosis';
import clinicalDiagnosis from './clinical_diagnosis';
import investigations from './investigations';
import auth from '../../controllers/auth';

const routes = express.Router();

routes.use(auth.verifyTokenAdmin);

routes.use('/answers', answers);
routes.use('/posts', posts);
routes.use('/recruitments', recruitments);
routes.use('/users', users);
routes.use('/doctor-specializations', docSpecialized);
routes.use('/drugs', drugs);
routes.use('/chief-complaint', chiefComplaint);
routes.use('/comorbidities', comorbidities);
routes.use('/provisional-diagnosis', provisionalDiagnosis);
routes.use('/differential-diagnosis', differentialDiagnosis);
routes.use('/clinical-diagnosis', clinicalDiagnosis);
routes.use('/investigations', investigations);

module.exports = routes;
