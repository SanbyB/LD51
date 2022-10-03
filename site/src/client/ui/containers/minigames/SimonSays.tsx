import React = require("react");
import { SimonSaysInformation, TaskInformation } from "../../../engine/commands/TaskCommands";
import { randomIntRange } from "../../../util/math";
import { ViewportComponent } from "../../components/ViewportComponent";
import { GameButtonContainer } from "../GameButtonContainer";

interface Props {
    task: SimonSaysInformation,
    onDone: (success: boolean) => void
}

interface SimonSaysButtonProps {
    onSelect: () => void,
    showDisplay: boolean
}

const SIMON_WIDTH = 3;
const SIMON_HEIGHT = 2;

const SimonSaysButton: React.FunctionComponent<SimonSaysButtonProps> = (props) => {
    const childStyle = props.showDisplay ? {
        backgroundColor: "#FF0000",
        margin: 8
    } : {
        margin: 8
    };
    
    return <GameButtonContainer
        width={64}
        height={64}
        style={{

        }}
        childStyle={childStyle}
        onSelect={props.onSelect}
    />
}

const SimonSaysRow: React.FunctionComponent<{
    onSelect: (x: number) => void,
    displayIndex: number | undefined
}> = (props) => {
    const row: any = []

    for (let i = 0; i < SIMON_WIDTH; i++) {
        row.push(<SimonSaysButton onSelect={() => props.onSelect(i)} showDisplay={props.displayIndex == i}/>)
    }

    return <div style={{
        display: "flex",
        flexDirection: "row"
    }}>
        {row}
    </div>
}

const SimonSaysButtonGrid: React.FunctionComponent<{
    onSelect: (x: number, y: number) => void,
    displayOrder: {
        x: number, y: number
    } | undefined
}> = (props) => {

    const rows = [];

    for (let i = 0; i < SIMON_HEIGHT; i++) {
        const displayOrder = (props.displayOrder && props.displayOrder.y == i) ? props.displayOrder.x : undefined;
        rows.push(<SimonSaysRow onSelect={x => props.onSelect(x, i)} displayIndex={displayOrder}/>)
    }

    return (<>
        {rows}
    </>)
}



function generateOrders(hard: boolean) {
    const orderCount = hard ? 6 : 3;
    const newOrders = [];
    for (let x = 0; x < orderCount; x++) {
        let numX = 0;
        let numY = 0;
        while (true && x > 0) {
            numX = randomIntRange(0, SIMON_WIDTH);
            numY = randomIntRange(0, SIMON_HEIGHT);
            if (numX != newOrders[x - 1].x || numY != newOrders[x - 1].y) {
                break;
            }
        }
        newOrders.push({
            x: numX,
            y: numY
        });
    }
    return newOrders;
}


const ORDER_SHOW_TIME = 500;

export const SimonSays: React.FunctionComponent<Props> = (props: Props) => {

    const { task, onDone } = props;
    const [orders, setOrders] = React.useState(generateOrders(props.task.hard));
    const [currentOrder, setCurrentOrder] = React.useState(0);
    const [currentOrderLimit, setCurrentOrderLimit] = React.useState(1);
    const [displayOrders, setDisplayOrders] = React.useState(true);

    const onSelect = (x: number, y: number) => {
        if (displayOrders) {
            return;
        }
        const order = orders[currentOrder];

        if (x == order.x && y == order.y) {
            const nextOrderNumber = currentOrder + 1;
            if (nextOrderNumber >= currentOrderLimit) {

                if (currentOrderLimit == orders.length) {
                    props.onDone(true);
                    return;
                }

                setCurrentOrderLimit(currentOrderLimit + 1);
                setCurrentOrder(0);
                setDisplayOrders(true); 
            } else {
                setCurrentOrder(nextOrderNumber);
            }
        } else {
            props.onDone(false);
        }
    }

    React.useEffect(() => {
        if (displayOrders) {
            if (currentOrder >= currentOrderLimit) {
                setDisplayOrders(false);
                setCurrentOrder(0);
            } else {
                const timeout = setTimeout(() => {
                    setCurrentOrder(currentOrder + 1);
                }, ORDER_SHOW_TIME);
                return () => clearTimeout(timeout)
            }
        }
    }, [currentOrder, displayOrders]);


    return (
        <>
            <SimonSaysButtonGrid 
                onSelect={onSelect}
                displayOrder={displayOrders && orders[currentOrder]}
                />
        </>
    );
};