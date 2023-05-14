import './styles/alert.scss';

function Alert({ title }) {
    return (
        <div data-testid="alert" className='alert'>
            {title}
        </div>
    )
}

export default Alert;