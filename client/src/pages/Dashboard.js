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
        geUser();
        getGenderUsers();
    }, [user,genderedUsers]);

    console.log('gendered users',genderedUsers);

        
    
    const [lastDirection, setLastDirection] = useState()
    
    const swiped = (direction, nameToDelete) => {
        console. log ('removing: ' + nameToDelete);
        setLastDirection(direction);
    }
    
    const outOfFrame = (name) => {
        console. log(name + ' left the screen!');
    }

   

    return (
        <>
            { user &&
                <div className="dashboard">
                    <ChatContainer user={ user }/>
                    <div className="swiper-container">
                        <div className="card-container">

                        {genderedUsers && genderedUsers.map( (character) =>
                            <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character. name)}> <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                <h3>{character.name}</h3> </div>
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