import { Router } from 'express';
import appointmentsRouter from './appointments.routs';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // use - funciona para qualquer tipo de rota

export default routes;
