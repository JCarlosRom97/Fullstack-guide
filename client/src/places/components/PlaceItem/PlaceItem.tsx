import React, { useState, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import './PlaceItem.css';
import Button from "../../../shared/components/FormElements/Button/Button";
import Map from "../../../shared/components/UIElements/Map/Map";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import { AuthContext } from "../../../shared/Context/auth-context";

const PlaceItem = ({ id, image, title, description, address, creatorId, coordinates }) => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);

    /* Map Modal handlers */
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => setShowConfirmModal(true);

    const cancelDeleteWarningHanlder = () => setShowConfirmModal(false);

    const confirmDeleteHandler = () => console.log('Deleting...')

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button onClick={closeMapHandler} >CLOSE</Button>}
            >
                <div className="map-container">
                    <Map lat={coordinates.lat} lng={coordinates.lng} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteWarningHanlder}
                header={'Are you sure?'}
                footerClass="place-item__modal-action" footer={
                    <>
                        <Button inverse onClick={cancelDeleteWarningHanlder}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                }
            >
                <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter.</p>
            </Modal>
            <li className="place-item">
                <Card>
                    <div className="place-item__image">
                        <img src={image} alt={title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {isLoggedIn && (
                            <>
                                <Button to={`/places/${id}`}>EDIT</Button>
                                <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    )
}


export default PlaceItem;