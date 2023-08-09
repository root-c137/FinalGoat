


import './Notice.css';
export const Notice = ({notice}) => {
    return(
        <div className="Notice">
            <p className="Notice__Msg">{notice !== null ? notice : ""}</p>
        </div>
    )
}

