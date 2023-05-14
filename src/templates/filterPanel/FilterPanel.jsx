import './styles/filterPanel.scss';
import Seperator from '../../components/atoms/seperator/Seperator';
import TextBox from '../../components/atoms/textBox/TextBox';
import Button from '../../components/atoms/button/Button';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button as RefreshButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";
import { getRandomItems, searchItem, setKeyword } from "../../redux/features/items";

function FilterPanel() {
    const dispatch = useDispatch();
    // get data from redux store
    const searchKeyword = useSelector((state) => state.items.searchKeyword);

    const onSetKeyword = (keyword) => {
        // bing search item keyword text with store
        dispatch(setKeyword(keyword));
    }

    const onSubmit = () => {
        // submit the search action
        if (searchKeyword !== "") {
            dispatch(searchItem(searchKeyword));
        }
    }

    const onRefresh = () => {
        // refresh random items
        dispatch(getRandomItems());
    }

    return (
        <div className='filterPanel'>
            <Seperator />
            <Grid container rowGap={1} className='filter-container'>
                <Grid item xs={12} md={10}>
                    <Grid container>
                        <Grid item xs={11} md={11} lg={5}>
                            {/* Search TextBox */}
                            <TextBox id="search" value={searchKeyword} size="small" placeholder="Search for a cocktail"
                                onChange={(e) => onSetKeyword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            {/* Search Button */}
                            <Button type="search" onClick={onSubmit} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={2} className='refresh-container'>
                    {/* Random Item List Refresh Button */}
                    <RefreshButton variant="outlined" endIcon={<AutorenewIcon />} onClick={onRefresh}>
                        Refresh
                    </RefreshButton>
                </Grid>
            </Grid>
            <Seperator />
        </div >
    )
}

export default FilterPanel;