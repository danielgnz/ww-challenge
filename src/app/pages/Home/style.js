import styled from '@emotion/styled';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

export const MainContainer = styled(Container)`
    .title {
        text-align: center;
    }
    
    .resetButton {
        display: flex;
        justify-content: center;
        margin-top: .5rem;
        width: 100%;
    }
`;

export const MainCard = styled(Card)`
`

export const MainCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const MainCardActions = styled(CardActions)`
    justify-content: flex-end;
    .backButton {
        margin-right: 5px;
    }
`