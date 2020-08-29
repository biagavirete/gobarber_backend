import { Router } from 'express';
import appointmentsRouter from './appointments.routs';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
