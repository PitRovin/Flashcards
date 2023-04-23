import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
//import your topics selector from your topics slice and replace assign a call to that selector to the variable topics (which is currently assigned an empty object).
import { useSelector } from "react-redux";
import { selectTopics } from "../features/topics/topicsSlice";
//import the thunk action creator from your quiz slice and dispatch 
//it from the handleSubmit() event handler that fires when the new quiz form
// is submitted.
//Remember, that action creator expects to receive a payload 
//of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.
// You’ll have to generate an id by calling uuidv4. For now, pass the 
//empty cardIds array variable for the cardIds property (you’ll change that in a 
//later task).
import { addQuizAndTopicId } from "../features/quizzes/quizzesSlice";
import { useDispatch } from "react-redux";
import { addCard } from "../features/cards/cardsSlice";



export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const history = useHistory();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    //Now that you have written code to collect an array of all the cardIds created whenever the new quiz form is submitted, replace the empty array with this array of cardIds.

    const cardIds = [];
    //in the event handler that fires when the quiz form is submitted, iterate 
    //through the cards in that form’s local state, and for each one: dispatch 
    //your addCard action creator. You will have to generate an id for each card 
    //using uuidv4. Store the id you create for each card in the cardIds array 
    //we’ve provided for you.Remember, your action creator expects to receive a payload of the form { id: '123', front: 'front of card', back: 'back of card'}. You want to collect all the cardIds in an array so that you can pass them to the action creator that generates new quizzes. To use uuidv4 to create an id, call the function like so: uuidv4().
    cards.forEach((card) => {
      const id = uuidv4();
      cardIds.push(id);
      dispatch(addCard({ id, front: card.front, back: card.back }));
    });

    dispatch(addQuizAndTopicId({id: uuidv4(), name, topicId, cardIds}));
    


    // create the new cards here and add each card's id to cardIds

    // create the new quiz here
    
    


    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}