import React from "react";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    //alert("A code was submitted: " + this.state.value); //test code
    getTicket(this.state.value).then(data => {
      console.log(data);
      document.getElementById("ticketid").append(data.ticketid);
      document.getElementById("eventname").append(data.event.name);
      document.getElementById("tickettype").append(data.type.type);

    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label style = {{color: "#61dafb"}}>
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
          <thead >
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
          </tbody>
        </table>
      </div>
    );
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
