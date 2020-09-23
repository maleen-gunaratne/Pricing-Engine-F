import React, {useState} from "react";
import {Button, Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import ProductTable from "../table/productTable";
import Calculator from "../Calculator/calculator";

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        button: {
            marginLeft: theme.spacing(4),
        },
        topic: {
            color: 'black'
        },
        card: {
            margin: theme.spacing(4),
            border: 'solid 2px green',
            backgroundColor: 'whitesmoke'
        },
    }),
);

function HomePage(props) {
    const classes = useStyles();

    const [showCalculator, setShowCalculator] = useState(false);

    const renderCalculator = () => {
        setShowCalculator(!showCalculator);
    };

    return (
        <Card className={classes.card}>
            <CardHeader title="Product Prices"/>
            <CardContent>
                <Button className={classes.button}
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={renderCalculator}>
                    <b>{showCalculator ? 'Hide Calculators' : 'Show Calculators'}</b>
                </Button>

                {showCalculator &&
                <React.Fragment>
                    <Calculator
                        productName={"Penguin-Ears"}
                        unitsPerCarton={20}
                    />

                    <Calculator
                        productName={"Horse-Shoes"}
                        unitsPerCarton={5}
                    />
                </React.Fragment>
                }
                <Divider/>
                <ProductTable/>

            </CardContent>
        </Card>
    );

}

export default HomePage;
