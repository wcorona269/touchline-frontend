import './modal.scss';
import React, { useEffect } from 'react';
import LoginForm from '../forms/login';
import SignupForm from '../forms/signup';
import { closeModal } from '../../actions/modal_actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Box, Modal, useTheme } from '@mui/material';
import UploadPhoto from './upload-photo';

const ModalContainer = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const modal = useSelector(state => state.ui?.modal?.modal || null);
	const [open, setOpen] = useState(false);
	const [component, setComponent] = useState(<></>);

	useEffect(() => {
		switch (modal) {
			case 'login':
				setComponent(<LoginForm/>)
				setOpen(true);
				break;
			case 'signup':
				setComponent(<SignupForm/>)
				setOpen(true)
				break;
			case 'photo':
				setComponent(<UploadPhoto/>)
				setOpen(true);
				break;
			default:
				setComponent(<></>)
				setOpen(false);
		}

	}, [modal])

	const handleModal = (e) => {
		e.preventDefault();
		dispatch(closeModal())
	}
	
	return (
		<div>
			<Modal
				open={open}
				onClose={handleModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{ padding: { xs: 3, sm: 4 }, borderRadius: '20px', border: `1px solid ${theme.palette.divider}`, boxShadow: '0 24px 64px rgba(0,0,0,.45)', margin: 'auto', marginTop: { xs: 12, sm: 20 }, width: 'fit-content', maxWidth: 'calc(100vw - 32px)', background: theme.palette.background.paper, outline: 'none' }}>
					{component}
				</Box>
			</Modal>
		</div>
	)
}

export default ModalContainer;