import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getMatches} from "../../store/matches";
import MatchCard from "./MatchCard";
import "./Match.css";

export default function Match (isBoth) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const both_matches = useSelector(state => state.matches.both)
    const solo_matches = useSelector(state => state.matches.solo)

    useEffect(()=>{
        if (!isLoaded) {
            dispatch(getMatches(parseInt(id))).then(res => {
                setIsLoaded(true)
            })
        }
    },[id, dispatch, isLoaded])


    return isLoaded && <div className="matches-contaier">
        {isBoth && both_matches.map(match => <MatchCard match={match} key={`both-match_${match.user.userId}`}/>)}
        {!isBoth && solo_matches.map(match => <MatchCard match={match} key={`both-match_${match.user.userId}`}/>)}
    </div>
}
