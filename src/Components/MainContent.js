import React from "react";
// import jsQR from "jsqr";
import QRCode from "qrcode"; //requires npm install qrcode, originated from: https://github.com/soldair/node-qrcode
// also covered here : https://davidwalsh.name/create-qr-code
import QrReader from "react-qr-reader"; //https://reactjsexample.com/react-component-for-reading-qr-codes-from-webcam/
import Header from "./Header";
import Footer from "./Footer";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.readTicket = this.readTicket.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.showTicketInfo();
  };

  showTicketInfo() {
    try {
      getTicket(this.state.value).then(data => {
        console.log(data);
        document.getElementById("ticketid").innerText = data.ticketid;
        document.getElementById("eventname").innerText = data.event.name;
        document.getElementById("tickettype").innerText = data.type.type;
        document.getElementById("valid").innerText = data.valid;
        document.getElementById("used").innerText = data.used;
        generateQR(data.ticketcode);
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleScan(data) {
    console.log(data);
    if (data) {
      this.setState({
        value: data
      });
      this.showTicketInfo();
    }
  }

  showReader() {
    document.getElementById("QRReader").style = { display: "flex" };
  }

  handleError(err) {
    console.error(err);
  }

  async readTicket(event) {
    event.preventDefault();
    const auth = btoa("niilo:salasana");
    // eslint-disable-next-line
    const response = await fetch(
      "https://ticketguru.herokuapp.com/api/tickets/read/" + this.state.value,
      {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept : 'text/html; charset=UTF-8',
          Authorization: "Basic " + auth
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
      }
    )
      .then(response => response.text())
      .then(response => {
        console.log(response);
        document.getElementById("result").innerText = response;
      })
  }



  render() {
    return (
      
  <div>
    <Header/>
      <div className ="main">

        <div className="form-group" style={{paddingLeft: '10%', }}>> 

          <form onSubmit={this.handleSubmit}>
            <label style={{ color: "#61dafb", fontSize: 22}}>
              Insert ticket-code:
              <input
                className="form-control"
                id="ticketcode"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              ></input>
            </label>

            <div className="form-group">
              <button type="button" className="btn btn-secondary btn-lg btn-block" type="submit">Hae lipun tiedot</button>
            </div>

          </form>

          <div className="form-group">
            <button
              id="readQR"
              className="btn btn-secondary btn-lg btn-block"
              onClick={this.showReader}
            > Or read a QR-code 
            </button>
          </div>

          <span id="QRReader" className="container" style={{ display: "none" }}>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "50%" }}
            />
          </span>

      </div>
      


       <div className='half'>          
                <table class="table table-dark table-striped table-borderless text-left border border-dark">
                  <thead>
                    <tr>
                      <th>
                        <h3>Ticket info:</h3>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Ticket id: </th>
                      <td id="ticketid"></td>
                    </tr>
                    <tr>
                      <th>Event name: </th>
                      <td id="eventname"></td>
                    </tr>
                    <tr>
                      <th>Ticket type:</th>
                      <td id="tickettype"></td>
                    </tr>
                    <tr>
                      <th>Validity: </th>
                      <td id="valid"></td>
                    </tr>
                    <tr>
                      <th>Used: </th>
                      <td id="used"></td>
                    </tr>
                  </tbody>
                </table>

              <button
                className="btn btn-secondary btn-lg btn-block"
                onClick={this.readTicket}
              > Käytä lippu 
              </button>

                <p id="result" style={{ color: "#61dafb" }}>  </p>
             

              <canvas className="canva" id="qr" width="300" height="300"></canvas>

                </div>
            </div>
        <Footer/> 
      </div>
    
    );
  }
}

const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text));
    await QRCode.toCanvas(document.getElementById("qr"), text);
  } catch (err) {
    console.error(err);
  }
};

async function getTicket(code = "") {
  const auth = btoa("niilo:salasana");
  const response = await fetch("https://ticketguru.herokuapp.com/api/tickets/" + code, {
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
  });
  return await response.json();
}

export default MainContent;