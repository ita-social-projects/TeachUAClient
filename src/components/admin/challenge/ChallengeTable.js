import React, { useState } from 'react';
import AddChallenge from "./AddChallenge";
import { Button } from 'antd';



const ChallengeTable = () => {

    return (
        <div>
            <Button type="button"
                    href="/addChallenge"
            >Додати челендж</Button>
        </div>
    )
}
export default ChallengeTable;