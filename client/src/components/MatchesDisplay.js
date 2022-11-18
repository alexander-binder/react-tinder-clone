import { useState, useEffect } from "react";
import axios from 'axios';

const MatchesDisplay = ({ matches, setClickedUser, userConnectedId }) => {
    
    const [matchedProfiles, setMatchedProfiles] = useState(null);

    const likedUserIds = matches.map(({user_id}) => user_id);

    // console.log('likedUserId_____'+ JSON.stringify(likedUserIds));
    
    const geMatches = async () => {
        try {
 
             const response = await axios.get('http://localhost:8000/getmatches',{ 
                 params: {userIds: JSON.stringify(likedUserIds), connectedId:userConnectedId}
             });
             
            setMatchedProfiles(response.data);
         
        } catch (error) {
             console.log(error);
        }
    }

    useEffect(() => {
        geMatches()
      
    }, []);
 

    return (
      <div className="matches-display">
        {matchedProfiles?.map((oppositionLikedProfile, index)=> (
            
            // checking if user connected is in the matches of the profile he liked! is so than display the match.
            oppositionLikedProfile && oppositionLikedProfile.matches.map((likedProifle) => {
                        if(likedProifle.user_id === userConnectedId){
                            return(
                                <div key={index} className="match-card" onClick={ () => setClickedUser(oppositionLikedProfile) }>
                                    <div className="img-container">
                                        <img src={oppositionLikedProfile?.url} alt={oppositionLikedProfile?.first_name + 'profile'}/>
                                    </div>
                                    <h3>{oppositionLikedProfile?.first_name}</h3>
                                </div>
                            )
                        }
                    })
            
        ))}
      </div>
    )
}

export default MatchesDisplay