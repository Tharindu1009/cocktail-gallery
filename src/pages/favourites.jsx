
import './styles/favourites.scss';
import { useSelector } from "react-redux";
import Header from "../components/organisms/header/Header";
import Footer from '../components/organisms/footer/Footer';
import CardList from '../templates/cardList/CardList';
import Seperator from '../components/atoms/seperator/Seperator';
import { Typography } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { useNavigate } from 'react-router-dom';
import { itemListTypes } from '../constants';

function Favourites() {
    const navigate = useNavigate();

    // get data from redux store
    const favouriteItems = useSelector((state) => state.items.favouriteItems);

    const goBack = () => {
        // redirect to back
        navigate(-1)
    }

    return (
        <div className='favourites'>
            <Header />
            <div className='container'>
                <div className='title-panel'>
                    <Seperator />
                    <div className='title-container'>
                        <ArrowCircleLeftRoundedIcon className='back-icon' onClick={goBack} />
                        <Typography variant="h5">
                            My Favourite List
                        </Typography>
                    </div>
                    <Seperator />
                </div>
                {/* Favourite Item List */}
                <CardList type={itemListTypes.favourite} items={favouriteItems} />
            </div>
            <Footer />
        </div>
    )
}

export default Favourites;