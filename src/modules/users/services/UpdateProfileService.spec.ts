import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import UpdateProfile from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfile(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fake Guy',
            email: 'fake@guy.com',
            password: '123456789',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Fake',
            email: 'John@fake.com',
        });

        expect(updatedUser.name).toBe('John Fake');
        expect(updatedUser.email).toBe('John@fake.com');
    });
    it('should not be able to change the email for another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Fake Guy',
            email: 'fake@guy.com',
            password: '123456789',
        });

        const user = await fakeUsersRepository.create({
            name: 'Fake',
            email: 'fake@teste.com',
            password: '123456789',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Fake',
                email: 'fake@guy.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fake Guy',
            email: 'fake@guy.com',
            password: '123456789',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Fake',
            email: 'John@fake.com',
            password: '123123',
            old_password: '123456789',
        });

        expect(updatedUser.password).toBe('123123');
    });
    it('should not be able to update the profile from non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existing user',
                name: 'anything',
                email: 'any@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to update the password without the old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fake Guy',
            email: 'fake@guy.com',
            password: '123456789',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Fake',
                email: 'John@fake.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to update the password with  wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fake Guy',
            email: 'fake@guy.com',
            password: '123456789',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Fake',
                email: 'John@fake.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
