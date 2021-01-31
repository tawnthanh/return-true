import React from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getMatches} from "../../store/matches";

export default function Match () {
    const dispatch = useDispatch();
    const {id} = useParams();

    dispatch(getMatches(parseInt(id)))

    return <h1>This is a match</h1>
}
