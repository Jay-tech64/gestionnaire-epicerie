import PropTypes from "prop-types";
import React from "react";

const GroupCard = ({ groupInfo }) => {
    return (
        <div
            className={
                "d-flex justify-content-between align-items-center rounded p-2 mb-3"
            }
            style={{ border: "1px solid black" }}
        >
            <div>
                <p className={"fs-4 m-0"}>{groupInfo.name}</p>
                <div className={"d-flex"}>
                    <p className={"me-1"}>{groupInfo.members.length}</p>

                    {groupInfo.members.length === 1 ? (
                        <p>membre</p>
                    ) : (
                        <p>membres</p>
                    )}
                </div>
            </div>
            <button className={"btn btn-primary"}>Voir détails</button>
        </div>
    );
};

GroupCard.propTypes = {
    groupInfo: PropTypes.object.isRequired,
};

export default GroupCard;
