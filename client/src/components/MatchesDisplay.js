import { useState, useEffect } from "react";
import axios from 'axios';

const MatchesDisplay = ({ matches, setClickedUser }) => {
    
    const [matchedProfiles, setMatchedProfiles] = useState(null);

    const likedUserIds = matches.map(({user_id}) => user_id);

    // console.log('likedUserId_____'+ JSON.stringify(likedUserIds));
    
    const geMatches = async () => {
        try {
 
             const response = await axios.get('http://localhost:8000/getmatches',{ 
                 params: {userIds: JSON.stringify(likedUserIds)}
             });
             
            setMatchedProfiles(response.data);
         
        } catch (error) {
             console.log(error);
        }
    }

    useEffect(() => {
        geMatches()
      
    }, []);

 
    // console.log('matchedProfiles_____'+ matchedProfiles[0].user_id);
    return (
      <div className="matches-display">
        {matchedProfiles?.map((match, index)=> (
            <div key={index} className="match-card" onClick={ () => setClickedUser(match) }>
                <div className="img-container">
                    <img src={match?.url} alt={match?.first_name + 'profile'}/>
                </div>
                <h3>{match?.first_name}</h3>
            </div>
        ))}
      </div>
    )
}

export default MatchesDisplay