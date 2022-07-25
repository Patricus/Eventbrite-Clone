const ADD_TICKET = 'ticket/ADD_TICKET'
const GET_ALL_TICKETS = 'ticket/GET_ALL_TICKETS'
const UPDATE_TICKET = 'ticket/UPDATE_TICKET'
const REMOVE_TICKET = 'ticket/REMOVE_TICKET'

const add = (ticket) => ({
    type: ADD_TICKET,
    ticket
});

const load = (tickets) => ({
    type: GET_ALL_TICKETS,
    tickets
});

const update = (ticket) => ({
    type: UPDATE_TICKET,
    ticket
});

const remove = (id) => ({
    type: REMOVE_TICKET,
    id
});

export const addOneTicket = ({attendee, for_sale, user_id, event_id}) => async dispatch => {
    const response = await fetch(`/api/tickets/purchase`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({attendee, for_sale, user_id, event_id})
    });
    if(response.ok){
        const ticket = await response.json();
        dispatch(add(ticket));
        return ticket
    }
    else {
        const ticket = await response.json()
        return ticket
    }

};

export const getAllTickets = (userId) => async dispatch => {
    const response = await fetch(`/api/tickets/${userId}`);
    if(response.ok){
        const tickets = await response.json();
        dispatch(load(tickets))
    }
}

export const updateTicket = (id, payload) => async dispatch => {
    const response = await fetch(`/api/tickets/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const ticket = await response.json();
        dispatch(update(ticket));
    };
};

export const deleteTicket = (ticket) => async dispatch => {
    const response = await fetch(`/api/tickets/delete/${ticket.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ticket)
    });
    if(response.ok){
        const id = await response.json();
        console.log(id)
        dispatch(remove(id));
    };
};

const initialState = {}

const ticketsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case ADD_TICKET:
            newState[action.ticket.id] = action.ticket;
            return newState;
        case GET_ALL_TICKETS:
            action.tickets.tickets.forEach(ticket=>{
                newState[ticket.id] = ticket
            })
            return newState;
        case UPDATE_TICKET:
            newState[action.ticket.id] = action.ticket;
            return newState;
        case REMOVE_TICKET:
            delete newState[action.id.id];
            return newState;
        default:
            return newState;
    };
};

export default ticketsReducer;
