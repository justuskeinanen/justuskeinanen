import React from "react";
//import jsQR from "jsqr";
import QRCode from "qrcode"; //requires npm install qrcode, originated from: https://github.com/soldair/node-qrcode
// also covered here : https://davidwalsh.name/create-qr-code
class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*
  readCode() {
    const jsQR = require("jsqr");

    let imageData = new (500, 500)();

    const code = jsQR(imageData, imageData.width, imageData.height);

    if (code) {
      console.log("Found QR code", code);
    }
  }
*/

  

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    getTicket(this.state.value).then(data => {
      console.log(data);
      document.getElementById("ticketid").innerText = data.ticketid;
      document.getElementById("eventname").innerText = data.event.name;
      document.getElementById("tickettype").innerText = data.type.type;
      document.getElementById("valid").innerText = data.valid;
      document.getElementById("used").innerText = data.used;
      generateQR(data.ticketcode);
    });
  };

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label style={{ color: "#61dafb" }}>
            Insert ticket-code:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </label>
          <input type="submit" value="Submit" />
        </form>

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
        <canvas id="qr" width="200" height="200"></canvas>
      </div>
    );
  }
}

const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text))
    await QRCode.toCanvas(document.getElementById("qr"), text)
  } catch (err) {
    console.error(err)
  }
}

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
