import React from "react";
// import jsQR from "jsqr";
import QRCode from "qrcode"; //requires npm install qrcode, originated from: https://github.com/soldair/node-qrcode
// also covered here : https://davidwalsh.name/create-qr-code
import QrReader from "react-qr-reader"; //https://reactjsexample.com/react-component-for-reading-qr-codes-from-webcam/

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
      "http://localhost:8080/api/tickets/read/" + this.state.value,
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
      .then(response => response.json())
      .then(response => {
        document.getElementById("result").innerText = JSON.stringify(response);
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label style={{ color: "#61dafb" }}>
            Insert ticket-code:
            <input
              id="ticketcode"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button
          id="readQR"
          className="btn btn-success"
          onClick={this.showReader}
        >
          Or read a QR-code
        </button>
        <span id="QRReader" className="container" style={{ display: "none" }}>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "50%" }}
          />
        </span>

        <div className="container">
          <table className="table table-dark table-striped table-borderless text-left border border-dark">
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
          <input
            onClick={this.readTicket}
            className="btn btn-danger"
            defaultValue="Use this ticket!"
          ></input>
          <p id="result" style={{ color: "#61dafb" }}></p>
        </div>
        <canvas id="qr" width="200" height="200"></canvas>
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
  const response = await fetch("http://localhost:8080/api/tickets/" + code, {
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