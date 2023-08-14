import React from "react";

export const appStyles: { [name: string]: React.CSSProperties } = {
    containerMain: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    separator: {
        margin: 10,
    },
    textareaLarge: {
        width: 1016,
        height: 150,
        backgroundColor: "#eee",
    },
    textareaSmall: {
        width: 500,
        height: 150,
        backgroundColor: "#eee",
    },
    doubleGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
    },
    quadrupleGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
    },
    centerStyle: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
};
