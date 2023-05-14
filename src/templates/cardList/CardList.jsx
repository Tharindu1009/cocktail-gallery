import './styles/cardList.scss';
import Grid from '@mui/material/Grid';
import Card from '../../components/molecules/card/Card';
import Alert from '../../components/molecules/alert/Alert';
import { Rings } from 'react-loader-spinner';
import { itemListTypes } from '../../constants';

function CardList({ items, loading, type }) {
    return (
        <div data-testid="cardList" className='cardList'>
            {/* List Loader */}
            {loading && <div className='loader'><Rings color="#878787" height={80} width={80} /></div>}
            {/* Item List */}
            <Grid container spacing={2} rowGap={1} justifyContent="center" alignItems="center"
                className='filter-container'>
                {items ?
                    items.length > 0 ?
                        items.map((item, i) => (
                            <Grid item xs={12} md={4} lg={3}>
                                <Card key={i} item={item} isLiked={type === itemListTypes.favourite} />
                            </Grid>
                        ))
                        : <Alert title="No data found." />
                    : null
                }
            </Grid>
        </div >
    )
}

export default CardList;