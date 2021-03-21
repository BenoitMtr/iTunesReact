import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Artiste
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.content.artistName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Titre de la musique
                </Typography>
                <Typography variant="body2" component="p">
                    {props.content.trackName}
                </Typography>
            </CardContent>
            <CardActions style={{display: "flex",
                justifyContent: "center",
                alignItems: "center"}} >
                <Link to={props.url.fullUrl}><Button size="small" >Voir les détails</Button></Link>
            </CardActions>
        </Card>
    );
}