import React, { Component } from 'react';
import AOS from 'aos'
import '../App.css';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module'
AOS.init();


var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://polici-web-302404.ue.r.appspot.com/api/email/',
    getTargetUrl = 'https://polici-web-302404.ue.r.appspot.com/'
class OutlinedButtons extends Component {

    handleClick = () => {
        this.props.history.push("./Demo");
    }

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            email: '',
            sent: false
        };
        AOS.init({ duration: 1000 });

    }

    //changing state as you type into form
    updateEmail = (event) => {
        let email = event.target.value
        this.setState({ email: email })
        console.log("updated")
    }

    //submitting email to database
    addEmail = async (event) => {
        // ReactGA.event({
        //     category: 'Navigation',
        //     action: 'Clicked Submit'
        // });
        event.preventDefault()
        var thisResponse = this;
        var response = await fetch(targetUrl, {
            method: 'post',
            body: new URLSearchParams({
                'email': this.state.email
            })
        })
        var status = response.status;
        if (status == "500") {
            thisResponse.setState({ apiResponse: "Invalid email address provided." })
        }
        else if (status == "201") {
            TagManager.dataLayer({
                dataLayer: {
                    event: "subscribe"
                    /* can pass more variables here if needed */
                }
            });
            thisResponse.setState({ apiResponse: "", email: "", sent: true });
            var frm = document.getElementById('emailform');
            frm.value = "";
            thisResponse.props.history.push("./PostSub");
        }
        else {
            console.log(response.json());
        }
    }


    //test to see if front end server is connected to backend API
    // callAPI() {
    //     fetch(proxyUrl + getTargetUrl)
    //     .then(res => res.text())
    //     .then(res => this.setState({ apiResponse: res }));
    // }

    componentWillMount() {
        // this.callAPI();
    }
    render() {
        return (
            <div style={{
                textAlign: 'left',
                paddingLeft: '40px',
                marginBottom: '40px',
                color: "#FFFFFC",
                backgroundColor: "#000000"
            }}
            >
                <h1 style={{ fontSize: "70px" }} data-aos="zoom-in"><a href="https://www.polici.org/"> polici </a></h1>
                <div style={{
                    textAlign: 'left',
                    paddingTop: '50px',
                    paddingBottom: '50px',
                    color: "#FFFFFC",
                    width: '70%',
                }}>
                    <h2>
                        <b>Bringing Data to Your Day In Under Three Minutes 📈</b>
                    </h2>


                    <hr></hr>
                    <h3>
                        Get the free, weekly email that brings data science,
                        cutting edge research findings, and a splash of humor to the headlines.

                        </h3>
                </div>

                <div >
                    <form noValidate autoComplete="on" onSubmit={this.addEmail} style={{ flex: '60%' }}>
                        <h2>Try it out! 🚀</h2>
                        <input id="emailform"
                            type='text'
                            placeholder="Email"
                            name="email"
                            onChange={this.updateEmail}
                        />
                        <div style={{ flex: '40%' }}>
                            <input
                                type='submit'
                            />
                        </div>

                    </form>
                </div>

                <p >{this.state.apiResponse}</p>

                <Router>
                    <Link to="./Demo" onClick={this.handleClick}>
                        <h4 style={{
                            textDecoration: 'underline'
                        }}>
                            <i>Check out our last issue.</i>
                        </h4>
                    </Link>
                </Router>



            </div>
        );
    }
}

export default withRouter(OutlinedButtons);