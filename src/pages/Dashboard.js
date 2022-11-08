import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import TinderCard from 'react-tinder-card';

const Dashboard = () => {

    const characters = [
        {
            name: 'Richard Hendricks',
            url: 'https://images.unsplash.com/photo-1519076381129-b4234ae7e573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aGVhZHNob3Qsd29tYW58fHx8fHwxNjY3ODM4MTMy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
        },
        {
            name: 'Erlich Bachman',
            url: 'https://source.unsplash.com/random/?headshot,woman'
        },
        {
            name: 'Monica Hall', 
            url: 'https://source.unsplash.com/random/?headshot,woman'
        },
        {
            name: 'Jared Dunn', 
            url: 'https://source.unsplash.com/random/?headshot,woman'
        },
        {   
            name: 'Dinesh Chugtai',
            url: 'https://source.unsplash.com/random/?headshot,woman' 
        }
    ];
        

    // const characters = db;
    
    const [lastDirection, setLastDirection] = useState()
    
    const swiped = (direction, nameToDelete) => {
        console. log ('removing: ' + nameToDelete);
        setLastDirection(direction);
    }
    
    const outOfFrame = (name) => {
        console. log(name + ' left the screen!');
    }


    return (
        <div className="dashboard">
            {/* <ChatContainer/> */}
            <div className="swiper-container">
                <div className="card-container">

                {characters.map( (character) =>
                    <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character. name)}> <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                        <h3>{character.name}</h3> </div>
                    </TinderCard>
                )}

                </div>
            </div>

        </div>
    );
}

export default Dashboard;