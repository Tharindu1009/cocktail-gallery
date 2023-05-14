import './styles/header.scss';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const goToHome = () => {
        // redirect to the home page
        navigate("/");
    }

    return (
        <div data-testid="header" className='header'>
            <Typography data-testid="headerTitle" variant="h6" className='title' onClick={goToHome}>
                Cocktail Gallery
            </Typography>
        </div>
    )
}

export default Header;