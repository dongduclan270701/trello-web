import 'Style/Card.scss'
import React, { useState } from 'react'
// import { MODAL_ACTION_CONFIRM } from 'utils/constants'
import { Form, Button } from 'react-bootstrap' // Sử dụng thư viện của react bootstrap

const Card = (props) => {
    const { card, onUpdateCard } = props //Nhận giá trị props từ component cha xuống component con
    const [toggleOpenFormInformationCard, setToggleOpenFormInformationCard] = useState(false)

    const toggleOpenInformationCard = () => {
        setToggleOpenFormInformationCard(!toggleOpenFormInformationCard)
    }


    const [cardTitle, setCardTitle] = useState(card.title) // Khởi tạo state
    const HandleCardTitleChange = (e) => setCardTitle(e.target.value)
    const HandleColumnTitleBlur = () => {
        const newCard = {
            ...card,
            title: cardTitle
        }
        onUpdateCard(newCard)
        toggleOpenInformationCard()
        // console.log(newCard)
    }
    return (
        <>
            {toggleOpenFormInformationCard === false ?
                <div className='card-item' onClick={toggleOpenInformationCard}>
                    {card.cover && <img src={card.cover} alt='imag' />}
                    {card.title}
                </div>
                :
                <div className='card-item'>
                    {card.cover && <img src={card.cover} alt='imag' />}
                    {card.title}
                    {toggleOpenFormInformationCard === true &&
                        <>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Text..."
                                className="input-enter-new-column"
                                onChange={HandleCardTitleChange}
                                onBlur={HandleColumnTitleBlur}
                                value={cardTitle}
                                
                            />
                            <Button variant="success" size="sm" onClick={() => { HandleColumnTitleBlur(); toggleOpenInformationCard() }}>
                                Change Card
                            </Button>
                        </>
                    }
                </div>
            }

        </>
    )
}

export default Card

