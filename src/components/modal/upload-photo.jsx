import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../../actions/user_actions';

const UploadPhoto = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const username = useSelector(state => state.session.user?.username)
	const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
	const handleDrop = (acceptedFiles) => {
		// Do something with the accepted file(s)
		// For example, you can check the properties of the file(s)
		acceptedFiles.forEach((file, idx) => {
			const formData = new FormData();
			formData.append('file', file)
			if (idx === 0) {
				dispatch(updateAvatar(username, formData))
				window.location.reload()
			}
		});
	};

  return (
		<Box>
			<Typography variant='subtitle1' align='center' fontFamily={theme.typography.bold} sx={{color: theme.palette.text.primary, marginBottom: 2}} id="toast">Update Avatar Photo</Typography>
			<Dropzone
				accept={acceptedImageTypes.join(',')}
				maxFiles={1}
				onDrop={handleDrop} // Add the onDrop callback
				multiple={false}
				canCancel={false}
				inputContent="Upload Avatar"
			>
				{({ getRootProps, getInputProps, isDragActive }) => (
					<div
						{...getRootProps()}
						style={isDragActive ? { borderColor: theme.palette.primary.main } : {}}
					>
						<input {...getInputProps()} />
						{isDragActive ? (
							<Typography sx={{color: theme.palette.text.primary}} variant="body2">Drop the file here ...</Typography>
						) : (
							<Typography sx={{color: theme.palette.text.primary}} variant="body2">
								Click or drop to select photo (jpeg or png)
							</Typography>
						)}
					</div>
				)}
			</Dropzone>
		</Box>
	)
}

export default UploadPhoto;