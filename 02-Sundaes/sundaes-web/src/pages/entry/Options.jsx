import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import { formatCurrency } from "../../utilities";
import { pricePerItem } from "../../constants";

const Options = ({ optionType }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    //const { totals } = useOrderDetails();

    useEffect(() => {
        // create an abortController to attach to the network request
        const controller = new AbortController();
        axios
            // attach abortController to request
            .get(`http://localhost:3030/${optionType}`, {
                signal: controller.signal,
            })
            .then((response) => setItems(response.data))
            .catch((error) => {
                if (error.name !== "CanceledError") {
                    setError(true);
                }
            });
        return () => {
            // on unmount, abort any active requests
            controller.abort();
        };
    }, [optionType]);

    const ItemComponent = optionType === "scoops" ? ScoopOption : null;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map((item) => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ));

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <Row>{optionItems}</Row>
        </>
    );
};

export default Options;
