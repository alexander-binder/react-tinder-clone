import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect  } from "react";
import TinderCard from 'react-tinder-card';
import ChatContainer from "../components/ChatContainer";
import axios from 'axios';
import { useCookies } from "react-cookie";


const Dashboard = () => {

    const [user, setUser] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const [genderedUsers, setGenderedUsers] = useState(null)

    const userId = cookie.UserId;
  
    const geUser = async () => {
       try {

            const response = await axios.get('http://localhost:8000/user',{ 
                params: {userId}
            });

            setUser(response.data);
        
       } catch (error) {
            console.log(error);
       }
    }

    const getGenderUsers = async () =>  {
        try {

            const response = await axios.get('http://localhost:8000/gendered-users',{ 
                params: {gender: user && user.gender_interest}
            });

            setGenderedUsers(response.data);
        
       } catch (error) {
            console.log(error);
       }
   
    }
    
    useEffect(() => {
        !user && geUser();
        !genderedUsers && getGenderUsers();
    }, [user,genderedUsers]);

    // console.log('gendered users',genderedUsers);

        
    
    const [lastDirection, setLastDirection] = useState()
    
    const updateMatches = async (matchedUserId) => {
        try {
            console.log('you went till update');
            const response = await axios.put('http://localhost:8000/addmatch',{ 
                userIdConnected: user && userId,
                matchedUserId
            });

            geUser();
        
       } catch (error) {
            console.log(error);
       }
   
    }

    const swiped = (direction, swipedUserId) => {
       
        
        if(direction === 'right'){
            updateMatches(swipedUserId);
            console.log ('you swiped: ' + direction);
        }
       
        setLastDirection(direction);
        console.log ('removing: ' + swipedUserId);
    
    }
    
    const outOfFrame = (name) => {
        console. log(name + ' left the screen!');
    }

    const likedProfileIds = user && user.matches.map(({ user_id }) =>  user_id ).concat(userId)


    const notMatchedUserProifles = genderedUsers?.filter(
        (userProfile) => !likedProfileIds.includes(userProfile.user_id)
    );
    // console.log(matchedUserProifles);
   

    return (
        <>
            { user &&
                <div className="dashboard">
                    <ChatContainer user={ user }/>
                    <div className="swiper-container">
                        <div className="card-container">

                        {genderedUsers && notMatchedUserProifles.map( (user) =>
                            <TinderCard className='swipe' key={user.first_name} onSwipe={(dir) => swiped(dir, user.user_id)} onCardLeftScreen={() => outOfFrame(user.first_name)}> <div style={{ backgroundImage: 'url(' + user.url + ')' }} className='card'>
                                <h3>{user.first_name}</h3> </div>
                            </TinderCard>
                        )}

                        </div>
                    </div>

                </div>
            }
        </>
    );
}

export default Dashboard;