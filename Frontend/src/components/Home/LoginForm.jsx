/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useAuthActions } from '../../hooks/useAuthActions.js';
import { AuthContext } from '../../context/AuthContext.jsx';

export const LoginForm = () => {
	const navigate = useNavigate();
	const { login } = useAuthActions();
	const { state: userState } = useContext(UserContext);
	const { state: authState } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const users = userState.users;
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (values) => {
		try {
			const userData = {
				email: values.email,
				password: values.password,
			};
			const user = await login(userData);
			if (user && user.rol === 'admin') {
				navigate('/admin');
			} else if (user && user.rol === 'kitchen') {
				navigate('/kitchen');
			} else if (user && user.rol === 'server') {
				navigate('/server');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className='flex flex-wrap items-center justify-center flex-col pb-10'>
			<Form
				id='loginForm'
				className='mt-1 flex flex-col justify-center items-center w-[300px] border-2 border-white bg-slate-700 pb-6 rounded-xl'
				onSubmit={handleSubmit(onSubmit)}>
				<h2 className='text-center textshadow text-3xl text-white font-bold m-7'>
					Iniciar Sesión
				</h2>

				<Form.Group
					className='flex flex-col w-full px-3 items-center'
					controlId='inputemail'>
					<div className='relative'>
						<select
							className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
							aria-label='Default select'
							id='email'
							{...register('email', {
								required: 'El Email es requerido',
							})}>
							<option>Selecciona tu usuario</option>
							{users
								? users
										.filter((user) => user.status === true)
										.map((user, id) => (
											<option key={id} value={user.email}>
												{user.name} {user.subname}
											</option>
										))
								: null}
						</select>
						{errors.email && (
							<span className='text-red-700 fs-6'>
								{errors.email.message}
							</span>
						)}
					</div>
				</Form.Group>

				<Form.Group
					className='flex flex-col w-full items-center px-3 mt-3'
					controlId='inputpassword'>
					<div className='flex flex-row shadow-2xl w-full justify-between bg-white rounded-lg border-2 border-black'>
						<div className='relative'>
							<input
								className='items-center text-black w-full p-2 rounded-md pl-7 focus:outline-none'
								type={showPassword ? 'text' : 'password'}
								{...register('password', {
									required: 'La contraseña es requerida',
									minLength: {
										value: 7,
										message:
											'La contraseña debe contener al menos 7 dígitos',
									},
								})}
								placeholder='Contraseña'
							/>
						</div>
						<button
							type='button'
							onClick={toggleShowPassword}
							id='viewpass'
							className='border-none'>
							<i
								className={`text-xl p-2 ${
									showPassword
										? 'fa-solid fa-eye-slash'
										: 'fa-solid fa-eye'
								}`}></i>
						</button>
					</div>{' '}
					{errors.password && (
						<span className='text-red-500 fs-6  p-2'>
							{errors.password.message}
						</span>
					)}
				</Form.Group>

				<Form.Group
					className='flex flex-col items-center'
					controlId='submit'>
					<Button
						className={`m-3 w-[152px] bg-slate-100 border-2 shadow-3xl border-slate-700 text-slate-700 rounded-2xl font-semibold ${
							authState.loading
								? 'bg-slate-700 text-slate-50 p-0 border-slate-50'
								: 'hover:text-slate-100 hover:bg-slate-700 hover:border-slate-100 p-2'
						}`}
						type='submit'
						disabled={authState.loading}>
						{authState.loading ? (
							<div className='bg-slate-700 w-full p-0 rounded-2xl '>
								<i
									className='pi pi-spin pi-spinner text-slate-50 py-2'
									style={{ fontSize: '2rem' }}></i>
							</div>
						) : (
							<>
								<i className='text-xl pe-2 fa-solid fa-right-to-bracket'></i>
								Iniciar Sesión
							</>
						)}
					</Button>
				</Form.Group>
			</Form>
		</section>
	);
};

export default LoginForm;
