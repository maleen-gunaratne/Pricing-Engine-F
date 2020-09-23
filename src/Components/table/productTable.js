import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Card, CardContent, CardHeader, CircularProgress} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import {makeStyles} from '@material-ui/styles';
import {getTableData} from "../../Services/pricingService";

const useStyles = makeStyles((theme) => ({
        button: {
            marginLeft: theme.spacing(1),
        },
        card: {
            margin: theme.spacing(4),
            border: 'solid 2px darkorange'
        },
        greenRow: {
            backgroundColor: 'lightgray'
        },
        orangeRow: {
            backgroundColor: 'lightyellow'
        }
    }),
);

function ProductTable(props) {
    const classes = useStyles();
    const [penguinProducts, setPenguinProducts] = useState([]);
    const [horseProducts, setHorseProducts] = useState([]);
    const [isProductsLoading, setIsProductsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsProductsLoading(true);
            const res = await getTableData();
            console.log(res.data);
            if (res.data && Array.isArray(res.data) && res.data.length === 2) {
                const penguinProducts = res.data.filter(data => data.productName === 'penguine-ears')[0] || {};
                const horseProducts = res.data.filter(data => data.productName === 'Horse-shoe')[0] || {};
                setPenguinProducts(penguinProducts.price.map((price, index) => ({
                    productName: 'Penguin-Ears',
                    noOfUnits: index + 1,
                    price
                })));

                setHorseProducts(horseProducts.price.map((price, index) => ({
                    productName: 'Horse-Shoe',
                    noOfUnits: index + 1,
                    price
                })));
            }
            setIsProductsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Card className={classes.card}>
            <CardHeader title="Product Details"/>
            <CardContent>
                {isProductsLoading ? (<CircularProgress size={50} thickness={10}/>) : null}
                <Table className="Product Prices List">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Product Name</b></TableCell>
                            <TableCell><b>Number of Units</b></TableCell>
                            <TableCell><b>Actual Price</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {penguinProducts.map(({productName, noOfUnits, price}, index) => (
                            <TableRow key={index} className={classes.greenRow}>
                                <TableCell>
                                    <b>{index === 0 ? productName : ''}</b>
                                </TableCell>
                                <TableCell>
                                    <b>{noOfUnits}</b>
                                </TableCell>
                                <TableCell>
                                    <b>{price}</b>
                                </TableCell>
                            </TableRow>
                        ))}

                        {horseProducts.map(({productName, noOfUnits, price}, index) => (
                            <TableRow key={index} className={classes.orangeRow}>
                                <TableCell>
                                    <b>{index === 0 ? productName : ''}</b>
                                </TableCell>
                                <TableCell>
                                    <b>{noOfUnits}</b>
                                </TableCell>
                                <TableCell>
                                    <b>{price}</b>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

ProductTable.propTypes = {
    products: PropTypes.array,
};

ProductTable.defaultProps = {
    products: []
};

export default ProductTable;
