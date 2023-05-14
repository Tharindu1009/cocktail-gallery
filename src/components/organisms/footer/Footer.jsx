import './styles/footer.scss';
import { Typography } from '@mui/material';

function Footer() {
    return (
        <div data-testid="footer" className='footer'>
            <Typography variant="caption" display="block" className='copyright-text '>
                Copyright ©2023
            </Typography>
        </div>
    )
}

export default Footer;