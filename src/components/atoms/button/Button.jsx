import './styles/button.scss';
import * as React from 'react';
import CN from "classnames";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Button({ type, onClick }) {

    // Appling relevant style class by checking the "type" prop
    const ButtonClasses = CN({
        "btn btn__search": type === "search",
        "btn btn__favourite": type === "add",
        "btn btn__remove": type === "remove",
    });

    return (
        <IconButton data-testid="button" className={ButtonClasses} onClick={onClick}>
            {type === "search" && <SearchIcon data-testid="searchIcon" />}
            {type === "add" && <FavoriteBorderIcon data-testid="favoriteBorderIcon" />}
            {type === "remove" && <DeleteIcon data-testid="deleteIcon" />}
        </IconButton>
    );
}

export default Button;

