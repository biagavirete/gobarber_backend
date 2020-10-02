import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthOfProviderDTO from '../dtos/IFindAllInMonthOfProviderDTO';
import IFindAllInDayOfProviderDTO from '../dtos/IFindAllInDayOfProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthOfProvider(
        data: IFindAllInMonthOfProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayOfProvider(
        data: IFindAllInDayOfProviderDTO,
    ): Promise<Appointment[]>;
}
