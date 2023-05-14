import './styles/card.scss';
import { Card as CardItem, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import Button from '../../atoms/button/Button';
import { useDispatch } from "react-redux";
import { addFavouriteItem, removeFavouriteItem } from "../../../redux/features/items";

function Card({ item, isLiked, key }) {
    const dispatch = useDispatch();

    /**
     * Updating the item from favourite list
     */
    const updateFavouriteList = () => {
        /**
         * if this drink item is already liked by user should remove from the favourite list, 
         * otherwise should add to the list
         */
        if (isLiked) {
            dispatch(removeFavouriteItem(item.idDrink));
        } else {
            dispatch(addFavouriteItem(item));
        }
    }

    return (
        <div data-testid="card" className='card'>
            <CardItem>
                <CardMedia
                    component="img"
                    height="194"
                    image={item.strDrinkThumb}
                    alt="Thumbnail"
                />
                <CardContent className='cardContent'>
                    <Typography variant="overline" display="block" className='name'>
                        {item.strDrink}
                    </Typography>
                    <Typography variant="caption" display="block" mt={1} className='category'>
                        Category : {item.strCategory}
                    </Typography>
                </CardContent>
                <CardActions className='cardAction'>
                    <Button type={isLiked ? "remove" : "add"} onClick={updateFavouriteList} />
                </CardActions>
            </CardItem>
        </div>
    )
}

export default Card;