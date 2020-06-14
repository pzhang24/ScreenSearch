import React from 'react';
import MainCard from './MainCard';


/* Props
    results - array of results for our search
    viewInfo - function that must be passed to each card to view more info
*/

const MainList = (props) => {
    return (
        <div className="main-container">
            <div className="grid">
                {
                    props.results.map((item, index) => {

                        switch(item.media_type) {
                            case("movie"):
                                return <MainCard key={index} img={item.poster_path} 
                                    id= {item.id} type= {item.media_type} name={item.title}
                                    viewInfo={props.viewInfo} />;
                            case("tv"):
                                return <MainCard key={index} img={item.poster_path} 
                                    id= {item.id} type= {item.media_type} name={item.name}
                                    viewInfo={props.viewInfo} />;

                            case("person"):
                                return <MainCard key={index} img={item.profile_path}
                                    id= {item.id} type={item.media_type} name={item.name}
                                    viewInfo={props.viewInfo} />;
                            default: 
                                console.log("Result item does not type movie, tv, or person");
                                return <MainCard key={index} img={null} id={undefined} 
                                type={undefined} name={undefined} viewInfo={undefined} />;
                        }
                     
                    })
                }
            </div>
        </div>
    )
}

export default MainList;