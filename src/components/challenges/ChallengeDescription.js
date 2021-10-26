import {useEffect} from "react";
import React from "react";

const ChallengeDescription = ({challenge}) => {

    useEffect(() => {
        console.log(challenge);
    })
    // return <div>asdasd</div>
    return <div className="challenge-description" dangerouslySetInnerHTML={{__html: challenge.description}}></div>
}
export default ChallengeDescription;