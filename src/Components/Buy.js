import React from "react";
import {useState, useEffect} from "react";
import Header from "./Header";
import QRCode from "qrcode.react";


function Buy () {

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        total();
    });

var QRCode = require('qrcode.react');

const [tickets, setTickets] = useState([]);
const [pcs, setPcs] = useState("");
const [orderid, setOrderid] = useState('');
const [events, setEvents] = useState([]);
const [selectedEvent, setSelectedEvent] = useState('');
const [selectedType, setSelectedType] = useState('');
const [sold, setSold] = useState([]);
const [sum, setSum] =useState(0);


      async function getOrder() {
       try {   
            const auth = btoa('niilo:salasana');
            const response = await fetch("https://ticketguru.herokuapp.com/api/orders/", {
            method : 'post',
            mode: 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'Basic ' + auth,
            },
            body : JSON.stringify({})
            });
        const json = await response.json();
            console.log(json.orderid);
            setOrderid(JSON.stringify(json.orderid))
        } catch (error) {
            console.log("error");
        }
        }

        
      async function getEvents() {
        try {   
             const auth = btoa('niilo:salasana');
             const response = await fetch("https://ticketguru.herokuapp.com/api/events/", {
             method : 'get',
             mode: 'cors',
             cache : 'no-cache',
             credentials : 'same-origin',
             headers : {
                 'Accept': 'application/json',
                 'Content-Type' : 'application/json',
                 'Authorization' : 'Basic ' + auth,
             }
             });
         const json = await response.json();
             console.log(json);
             setEvents(json)
         } catch (error) {
             console.log("error");
         }
         }

         async function buy(evt) {
            evt.preventDefault(); 
            console.log(selectedEvent);
            console.log(pcs);
            console.log(orderid);
            console.log(selectedType);
            try {   
                 const auth = btoa('niilo:salasana');
                 const response = await fetch("https://ticketguru.herokuapp.com/api/events/"+  selectedEvent+"/tickets" , {
                 method : 'post',
                 mode: 'cors',
                 cache : 'no-cache',
                 credentials : 'same-origin',
                 headers : {
                     'Accept': 'application/json',
                     'Content-Type' : 'application/json',
                     'Authorization' : 'Basic ' + auth,
                 },
                 body : JSON.stringify({
        
                    pcs: pcs,
                    orderid: orderid,
                    tickettypeid: selectedType,
              
                  })                 
                 });
             const json = await response.json();
                 console.log(json);
                 setTickets(json)
             } catch (error) {
                 console.log("error");
             }
             }



             async function print(evt) {
                evt.preventDefault(); 
                console.log(orderid);
                try {   
                     const auth = btoa('niilo:salasana');
                     const response = await fetch("https://ticketguru.herokuapp.com/api/orders/"+  orderid+"/tickets" , {
                     method : 'get',
                     mode: 'cors',
                     cache : 'no-cache',
                     credentials : 'same-origin',
                     headers : {
                         'Accept': 'application/json',
                         'Content-Type' : 'application/json',
                         'Authorization' : 'Basic ' + auth,
                     },                
                     });
                 const json = await response.json();
                     console.log(json);
                     setSold(json)
                 } catch (error) {
                     console.log("error");
                 }
                 }


                 async function total() {
                    console.log(orderid);
                    try {   
                         const auth = btoa('niilo:salasana');
                         const response = await fetch("https://ticketguru.herokuapp.com/autoapi/orders/"+  orderid , {
                         method : 'get',
                         mode: 'cors',
                         cache : 'no-cache',
                         credentials : 'same-origin',
                         headers : {
                             'Accept': 'application/json',
                             'Content-Type' : 'application/json',
                             'Authorization' : 'Basic ' + auth,
                         },                
                         });
                     const json = await response.json();
                         console.log(json);
                         setSum(json.total);
                     } catch (error) {
                         console.log("error");
                     }
                     }



    return (
    <div>
    <Header/>   
        
    <div class ="main">
 

    <div class="formi">

        <div class="form-group">
            <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={getOrder}>Uusi tilaus</button>    
        </div> 

        <div class="form-group">   
    <p>Käsittelyssä oleva tilaus: {orderid}  (luo uusi jos tyhjä) </p>
        </div>
        
        <form>
        <div class="form-group">   
        <input class="form-control" type="number" value={pcs} id="example-number-input" onChange={ pcs => setPcs(pcs.currentTarget.value) }></input>    
        </div> 


        <div class="form-group">  
          <select class="form-control" id="exampleFormControlSelect1" value={selectedEvent} onChange={selectedEvent => setSelectedEvent(selectedEvent.currentTarget.value)}>
            <option value="0">Valitse tapahtuma</option>   
            {events.map(item => (
                <option
                key={item.eventid}
                value={item.eventid}
                >
                {item.name}
                </option>
            ))}
         </select>
         </div>

        <div class="form-group">  
          <select class="form-control" id="exampleFormControlSelect1"  value={selectedType} onChange={(selectedType) => setSelectedType(selectedType.target.value)}>
          <option value="4">Valitse lipputyyppi</option>
            <option value="4">Aikuinen</option>
            <option value="5">Lapsi</option>
            <option value="6">Opiskelija</option>
          </select>
          </div>

        <div class="form-group">
            <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={buy}>Osta liput</button>    
        </div> 

        <div class="form-group">
            <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={print}>Tulosta tilauksen liput</button>    
        </div>         

    </form>
    </div>

    <div class="half">
        <table className="table table-dark table-striped table-borderless text-left border border-dark">
            <thead>
            <tr>
                <th>Tapahtuma</th>
                <th>Hinta</th> 
                <th>Koodi</th>
            </tr>
            </thead>

            <tbody>
            {tickets.map(ticket => (
            <tr key ={ticket.ticketid}>
                <td> {ticket.event.name} </td>   
                <td> {ticket.price} </td>  
                <td> {ticket.ticketcode} </td>
            </tr>    
            ))}
            </tbody>
		 </table>

         <div class="form-group">   
            <p>Summa yhteensä: {sum}  </p>
        </div>

     </div>       
    </div>

    <div class="print">
        <table className="table table-dark table-striped table-borderless text-left border border-dark">
            <thead>
            <tr>
                <th>Tapahtuma</th>
                <th>Hinta</th> 
                <th>Koodi</th>
                <th>QR</th>
            </tr>
            </thead>

            <tbody>
            {sold.map(ticket => (
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
            </tr>    
            ))}
         
            </tbody>
		 </table>
     </div>
    
    </div>
          );
        };
 

export default Buy;
