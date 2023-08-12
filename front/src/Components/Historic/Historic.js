


import "./Historic.css";
import {EasyFetch} from "../../Utils/EasyFetch";
import {useEffect, useState} from "react";

export const Historic = ({historic}) =>
{

    return(
        <div className="Historic">
            <p>10 last votes</p>
            <div className="Historic__Tuto">
                <p><i className="fa-solid fa-arrow-right"></i> = First vote</p>
                <p><i className="fa-solid fa-arrow-right fa-arrow-right-update"></i> = Update vote</p>
            </div>
            <table className="Historic__List">
                <tbody>
                {
                    historic?.map((Item, key) => {
                        return (
                        <tr key={key} className="Historic__Card">
                            <td><span className="Username">{Item.Username }</span></td>
                            <td><i className="fa-solid fa-arrow-right"></i></td>
                            <td><span className="Vote">{Item.Vote}</span></td>
                            <td><span className="Date"><i className="fa-solid fa-clock"></i> {Item.CreatedAt}</span></td>

                        </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </div>
    );
}
