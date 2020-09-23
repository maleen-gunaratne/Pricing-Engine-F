import React, {useState} from "react";
import {Button, Card, CardContent, CardHeader, CircularProgress, Grid, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import PropTypes from "prop-types";
import {getHorseShoePrice, getPenguinEarsPrice} from "../../Services/pricingService";

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        topic: {
            color: 'black'
        },
        card: {
            margin: theme.spacing(4),
            border: 'solid 2px darkorange',
            backgroundColor: 'whitesmoke'
        },
    }),
);

function Calculator(props) {
    const classes = useStyles();
    const [isPriceCalculating, setIsPriceCalculating] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [noOfCartons, setNoOfCartons] = useState(0);
    const [noOfUnits, setNoOfUnits] = useState(0);

    const {productName, unitsPerCarton} = props;

    const getNoOfSingleUnits = () => {
        if (noOfCartons !== 0 || noOfUnits !== 0) {
            return (noOfCartons * unitsPerCarton) + noOfUnits;
        }
        return 0;
    };

    const calculateTotal = async (event) => {
        event.preventDefault();
        setIsPriceCalculating(true);

        const singleUnits = getNoOfSingleUnits();
        if (singleUnits === 0) {
            setTotalPrice(0);
            setIsPriceCalculating(false);
            return;
        }

        let response;
        if (productName === 'Penguin-Ears') {
            response = await getPenguinEarsPrice(singleUnits);
        } else {
            response = await getHorseShoePrice(singleUnits);
        }

        setTotalPrice(response.data);
        setIsPriceCalculating(false);
    };


    return (
        <Card className={classes.card}>
            <CardHeader title={`${productName} Price Calculator (Units Per Carton - ${unitsPerCarton})`}/>
            <CardContent>
                {isPriceCalculating ? (<CircularProgress size={50} thickness={10}/>) : null}

                <form className={classes.root} noValidate autoComplete="off" onSubmit={calculateTotal}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <TextField
                                name="cartons"
                                label="# of Cartons"
                                value={noOfCartons}
                                onChange={(event) => setNoOfCartons(parseInt(event.target.value))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{inputProps: {min: 0}}}
                                type='number'
                                margin="dense"
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                name="units"
                                label="# of Units"
                                value={noOfUnits}
                                onChange={(event) => setNoOfUnits(parseInt(event.target.value))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{inputProps: {min: 0}}}
                                type='number'
                                margin="dense"
                            />
                        </Grid>

                        <TextField
                            name="totalPrice"
                            label="Total Price"
                            value={totalPrice}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            aria-readonly={"true"}
                        />

                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={isPriceCalculating || (noOfCartons === 0 && noOfUnits === 0)}>
                                <b>Calculate Price</b>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}

Calculator.propTypes = {
    productName: PropTypes.string,
    unitsPerCarton: PropTypes.number,
};

Calculator.defaultProps = {
    productName: "",
    unitsPerCarton: 20
};

export default Calculator;
