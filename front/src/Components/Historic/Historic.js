


import "./Historic.css";
import {EasyFetch} from "../../Utils/EasyFetch";
import {useEffect, useState} from "react";

export const Historic = ({historic}) =>
{

    return(
        <div className="Historic">
            <h3>10 last votes</h3>
            <div className="Historic__Tuto">
                <p className="Tuto__Item"><i className="fa-solid fa-arrow-right"></i> = First vote</p>
                <p className="Tuto__Item"><i className="fa-solid fa-arrow-right fa-arrow-right-update"></i> = Update vote</p>
            </div>
            <div className="Historic__List">
                {
                    historic?.map((Item, key) => {
                        return (
                        <div key={key} className="Historic__Card">
                            <div className="Left">
                                <div className="Username">@{Item.Username}</div>
                                <div><i className={`fa-solid fa-arrow-right ${Item.UpdateOrFirst === "UPDATE" ? "fa-arrow-right-update" : ""}`}></i></div>
                                <div className={Item.Vote === "Messi" ? "Vote Vote--Messi" : "Vote Vote--Ronaldo"}>{Item.Vote}</div>
                            </div>
                            <div className="Date"><i className="fa-solid fa-clock"></i>{Item.CreatedAt}</div>
                        </div>
                        )
                    })
                }

            </div>
        </div>
    );
}
