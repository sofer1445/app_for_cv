import React from "react";

function NavLinkStyle({isActive}) {
    return isActive ? {
        color: "white",
        backgroundColor: "red",
        margin: 50,
        align: "center",
        column: "center"
    } : undefined;
}
export default NavLinkStyle;