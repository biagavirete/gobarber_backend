import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });
    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '123456789',
            user_id: '123456',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456789');
    });

    it('should not be able to create two appointments at the same time', async () => {
        const appointmentDate = new Date(2020, 5, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456789',
            user_id: '123456',
        });
        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123456789',
                user_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: '1231234223',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an appointment with the same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                user_id: '123123',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('shold not be able to crean an appointment before 08h and after 18h', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                user_id: '123123123',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 19),
                user_id: '123123123',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
