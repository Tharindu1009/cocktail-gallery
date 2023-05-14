
import './styles/home.scss';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRandomItems, clearError, clearSuccess } from "../redux/features/items";
import Header from "../components/organisms/header/Header";
import Footer from '../components/organisms/footer/Footer';
import FilterPanel from '../templates/filterPanel/FilterPanel';
import CardList from '../templates/cardList/CardList';
import ToastAlert from '../components/molecules/alert/ToastAlert';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { itemListTypes } from '../constants';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get data from redux store
    const items = useSelector((state) => state.items.list);
    const { errorStatus, errorMessage } = useSelector((state) => state.items.error);
    const { successStatus, successMessage } = useSelector((state) => state.items.success);
    const loading = useSelector((state) => state.items.loading);

    useEffect(() => {
        // get random drinks items in initial stage
        dispatch(getRandomItems());
    }, []);

    const handleErrorClose = (reason) => {
        // close error alert and clear error messages
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearError());
    };

    const handleSuccessClose = (reason) => {
        // close success alert and clear success messages
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearSuccess());
    };

    const goToFavourites = () => {
        // redirect to favourites page
        navigate("/favourites");
    }

    return (
        <div className='home'>
            <Header />
            <div className='container'>
                <div className='link-wrapper'>
                    <Link underline="none" className='link' onClick={goToFavourites}>My Favourite List</Link>
                </div>
                <FilterPanel />
                <CardList type={itemListTypes.random} items={items} loading={loading} />
            </div>
            {/* Danger Alert */}
            <Snackbar open={errorStatus} autoHideDuration={3000} onClose={handleErrorClose}>
                <ToastAlert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </ToastAlert>
            </Snackbar>
            {/* Success Alert */}
            <Snackbar open={successStatus} autoHideDuration={3000} onClose={handleSuccessClose}>
                <ToastAlert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </ToastAlert>
            </Snackbar>
            <Footer />
        </div>
    )
}

export default Home;