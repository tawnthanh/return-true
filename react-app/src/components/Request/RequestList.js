import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {openTab} from "../../store/tabs";

export default function RequestList () {
    requests = useSelector(store => store.requests)

    return <>
        <h2>Requests</h2>
    </>
}
