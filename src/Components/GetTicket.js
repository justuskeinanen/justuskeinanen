//import React from 'react'

async function getTicket(code = '') {
    const auth  = btoa('niilo:salasana');
    const response = await fetch ("http://localhost:8080/api/tickets/" + code, {
        method : 'GET',
        mode: 'cors',
        cache : 'no-cache',
        credentials : 'same-origin',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Basic ' + auth,
        },
        redirect : 'follow',
        referrerPolicy : 'no-referrer',
    });
    return await response.json();
}

export default getTicket