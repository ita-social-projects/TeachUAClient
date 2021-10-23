import {useEffect} from "react";

const ChallengeDescription = ({challenge}) => {
    return <div className="challenge-description" dangerouslySetInnerHTML={{__html: challenge.description}}></div>
}
export default ChallengeDescription;