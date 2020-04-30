import React from "react";
import {useState} from "react";
import Header from "./Header";


function Read () {

const [ticket, setTicket] = useState([]);
const [code, setCode] = useState('');
const [errormessage, setErrormessage] = useState('');
const [message, setMessage] = useState('');
const [event, setEvent] = ('');
const [used, setUsed] = ('');
const [type, setType] = ('');
const [ticketcode, setTicketcode] = ('');

var QRCode = require('qrcode.react');
        
   
     const get = () => {
          
            const auth = btoa('niilo:salasana');
            fetch("https://ticketguru.herokuapp.com/api/tickets/" + code, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + auth
                },
                redirect: "follow",
                referrerPolicy: "no-referrer"
              })
              .then(response => response.json())
              .then( response => {
                  console.log(response);
                  setType(response.type.type);
                  setEvent(response.event.name);
              })
/*
            console.log(response); 

            if(response.status === 200){
                const json =  response.json();
                console.log(json);
                //setTicket(json);
                setType(json.type.type);
                setEvent(json.event.name);

            } else {
                setErrormessage('Lippua ei löydy')
            }
 */           
            .catch(err => {
                setErrormessage('Virhe');
                });
            }


         async function read(evt) {
            evt.preventDefault(); 
            try {   
                 const auth = btoa('niilo:salasana');
                 const response = await fetch("https://ticketguru.herokuapp.com/api/tickets/read/" + code , {
                 method : 'patch',
                 mode: 'cors',
                 cache : 'no-cache',
                 credentials : 'same-origin',
                 headers : {
                     'Accept': 'application/json',
                     'Content-Type' : 'application/json',
                     'Authorization' : 'Basic ' + auth,
                 },                 
                 });
                //jos palauttaa ok = lista    
                if(response.status === 200){
                    setMessage(JSON.stringify(response));
                } 
             } catch (error) {
                 console.log("error");
                 setErrormessage('Virhe');
                

             }
             }


    return (
    <div>
    <Header/>   
        
    <div className ="main">
 

    <div className="formi">
        
        <form>
        <div className="form-group">   
            <input type="text" className="form-control" placeholder="Lippukoodi:" value={code} id="example-number-input" onChange={ code => setCode(code.currentTarget.value) }></input>    
        </div> 


        <div className="form-group">
            <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={get}>Hae tiedot</button>    
        </div>        

    </form>
    </div>

    <div className="half">
        <table className="table table-dark table-striped table-borderless text-left border border-dark">
            <thead>
            <tr>
                <th>Tapahtuma</th>
                <th>Tila</th>
                <th>Tyyppi</th>
                <th>QR</th>
                <th>Lue lippu</th>
            </tr>
            </thead>

            <tbody>
           
            <tr>
                <td> {event} </td>   
                <td> {type} </td>  
              
                
               
                <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={read}>Käytä lippu</button> 
            </tr>    
           
            </tbody>


{/*
            <tbody>
            {ticket.map(ticket => (
            <tr key ={ticket.ticketid}>
                <td> {ticket.event.name} </td>   
                <td> {ticket.price} </td>  
                <td> {ticket.ticketcode} </td>
                
                <QRCode
                        value={ticket.ticketcode}
                        size={290}
                        level={"H"}
                        includeMargin={true}
                />
               
                <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={read}>Käytä lippu</button> 
            </tr>    
            ))}
            </tbody>
*/}
            
		 </table>
         
         <p> {message} </p>
         <p> {errormessage} </p>
     </div>       
    </div>

    <div className="print">

     </div>
    
    </div>
          );
        };
 

export default Read;
