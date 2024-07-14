/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useUserActions } from '../../../../hooks/useUserActions';
import { UserContext } from '../../../../context/UserContext';
import { useContext, useEffect } from 'react';

const EditTableDetails = ({
	selectedTable,
	onTableNumberChange,
	onWaiterChange,
	onTableBlur,
	salonName,
}) => {
	const { state } = useContext(UserContext);
	const { dataUsers } = useUserActions();
	const users = state.users;
	useEffect(() => {
		dataUsers();
	}, []);
	if (!selectedTable) return null;

	return (
		<div className='flex flex-col justify-center'>
			<h3 className='text-center w-full h-[40px] font-semibold pt-2 bg-slate-700 text-white items-center'>
				Editar Mesa {selectedTable.id}
			</h3>
			<p className='font-medium p-2'>
				Salón: <span className='font-normal'>{salonName}</span>
			</p>
			<div className='flex flex-row'>
				<label className='p-2 font-medium'>Número de Mesa:</label>
				<input
					className='w-[40px] p-1 border-1 border-slate-400'
					type='text'
					value={selectedTable.id}
					onChange={onTableNumberChange}
					onBlur={onTableBlur}
				/>
			</div>
			<label className='p-2 font-medium'>Mozo asignado:</label>
			<select
				className=' m-2 p-1 border-1 border-slate-400'
				type='text'
				value={selectedTable.waiter}
				onChange={onWaiterChange}
				onBlur={onTableBlur}>
				<option value=''>Seleccione un mozo</option>
				{users
					? users
							.filter((user) => user.rol === 'server')
							.map((user, id) => (
								<option key={id} value={user._id}>
									{user.name} {user.subname}
								</option>
							))
					: null}
			</select>
		</div>
	);
};

export default EditTableDetails;