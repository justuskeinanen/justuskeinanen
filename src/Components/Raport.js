import React from "react";
import {useState, useEffect} from "react";
import Header from "./Header";

function Raport () {

    useEffect(() => {
        getEvents();
    }, []);




const [events, setEvents] = useState([]);
const [selectedEvent, setSelectedEvent] = useState('');
const [result, setResult] = useState([]);




        
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

         async function raportti(evt) {
            evt.preventDefault(); 
            console.log(selectedEvent);
 
            try {   
                 const auth = btoa('niilo:salasana');
                 const response = await fetch("https://ticketguru.herokuapp.com/api/events/"+  selectedEvent+"/raport" , {
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
                 setResult(json)
             } catch (error) {
                 console.log("error");
             }
             }



       


    return (
    <div>
    <Header/>   
        
    <div className ="main">
 

    <div className="formi">

    <form>
        <div className="form-group">  
          <select className="form-control" id="exampleFormControlSelect1" value={selectedEvent} onChange={selectedEvent => setSelectedEvent(selectedEvent.currentTarget.value)}>
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

        <div className="form-group">
            <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={raportti}>Myyntiraportti</button>    
        </div>         

    </form>
    </div>

       
    </div>

    <div className="print">
        <table className="table table-dark table-striped table-borderless text-left border border-dark">
            <thead>
            <tr>
                <th>Lipputyyppi</th>
                <th>Myyty kpl</th> 
                <th>Voitot</th>
            </tr>
            </thead>

            <tbody>
            {result.map(result => (
            <tr key ={result.tickettype}>
                <td> {result.tickettype} </td>   
                <td> {result.pcs} </td>  
                <td> {result.total} </td>
            </tr>    
            ))}
         
            </tbody>
		 </table>
     </div>
    
    </div>
          );
        };
 

export default Raport;