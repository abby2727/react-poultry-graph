import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const CustomSnackbar = ({ open, handleClose, message }) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert
				onClose={handleClose}
				severity='error'
				sx={{ width: '100%' }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
