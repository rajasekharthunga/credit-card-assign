import "./App.css";
import { Form, Input, Button, DatePicker } from "antd";
import "antd/dist/antd.css";
import Chip from "./assets/images/chip.png";
import Visa from "./assets/images/visa.png";
import Amex from "./assets/images/amex.png";
import Dinersclub from "./assets/images/dinersclub.png";
import Discover from "./assets/images/discover.png";
import Jcb from "./assets/images/jcb.png";
import Mastercard from "./assets/images/mastercard.png";
import Troy from "./assets/images/troy.png";
import Unionpay from "./assets/images/unionpay.png";
import { useEffect, useState } from "react";
import moment from "moment";
import { getCardType } from "./cardType";

//Left for now
// 1 .Card Type Dynamic
// 3. Animations of input entries

function App() {
  const [name, setName] = useState("FULL NAME");
  const [cardNumber, setCardNumber] = useState("################");
  const [cardType, setCardType] = useState(Visa);
  const [cvv, setCvv] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("00");
  const [expirationYear, setExpirationYear] = useState("00");
  const [flip, setFlip] = useState(false);
  const [enteringCardNumber, setenteringCardNumber] = useState(false);
  const [enteringCardHolder, setenteringCardHolder] = useState(false);
  const [enteringCardExpiry, setenteringCardExpiry] = useState(false);

  useEffect(() => {
    const cardType = getCardType(cardNumber);
    switch (cardType) {
      case "VISA":
        setCardType(Visa);
        break;
      case "MASTERCARD":
        setCardType(Mastercard);
        break;
      case "AMEX":
        setCardType(Amex);
        break;
      case "MAESTRO":
        setCardType(Jcb);
        break;
      case "RUPAY":
        setCardType(Unionpay);
        break;
      default:
        setCardType(Visa);
    }
  }, [cardNumber]);

  let cardNumberArray = [
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
  ];

  return (
    <div className="App">
      <div className="whole-container">
        <div className="mini-contianer">
          <div className={flip ? "credit-card flip" : "credit-card"}>
            <div className="frontside">
              <div className="row-1">
                <img src={Chip} className="chip" />
                <img src={cardType} className="card-type" />
              </div>
              <div
                className={
                  enteringCardNumber ? "row-2 rounded-border" : "row-2"
                }
              >
                {cardNumberArray.map((ele, index) => {
                  return (
                    <span className={index % 4 === 0 ? "space" : ""}>
                      {cardNumber[index] ? cardNumber[index] : "#"}
                    </span>
                  );
                })}
              </div>
              <div className="row-3">
                <div
                  className={
                    enteringCardHolder
                      ? "card-holder rounded-border"
                      : "card-holder"
                  }
                >
                  <span>Card Holder</span>
                  <span style={{ textTransform: "uppercase" }}>
                    {name === "" ? "FULL NAME" : name}
                  </span>
                </div>
                <div
                  className={
                    enteringCardExpiry
                      ? "card-validity rounded-border"
                      : "card-validity"
                  }
                >
                  <span>Expires</span>
                  <span>
                    {expirationMonth} / {expirationYear}
                  </span>
                </div>
              </div>
            </div>
            <div className="backside">
              <div className="row-11"></div>
              <div className="row-12">
                <span>CVV</span>
                <span className="cvv-number">{cvv}</span>
              </div>
              <div className="row-13">
                <img src={cardType} className="card-type" />
              </div>
            </div>
          </div>
        </div>
        <div className="form">
          <Form
            name="credit-card-form"
            initialValues={{
              remember: true,
            }}
            colon={false}
          >
            <Form.Item
              label="Card Number"
              name="cardnumber"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[0-9]*$/),
                  message: "Card Number should have only numbers !",
                },
              ]}
            >
              <Input
                onChange={(e) => setCardNumber(e.target.value)}
                onKeyPress={(e) => setFlip(false)}
                // pattern="[1-9]{1}[0-9]{9}"
                maxLength={16}
                onMouseEnter={(e) => setenteringCardNumber(true)}
                onMouseLeave={(e) => setenteringCardNumber(false)}
              />
            </Form.Item>

            <Form.Item label="Card Holder" name="cardholder" colon={false}>
              <Input
                maxLength={31}
                onChange={(e) => setName(e.target.value)}
                onMouseEnter={(e) => setenteringCardHolder(true)}
                onMouseLeave={(e) => setenteringCardHolder(false)}
              />
            </Form.Item>
            <Form.Item colon={false} label="Expiration Date">
              <DatePicker
                picker="month"
                onChange={(e) => setExpirationMonth(moment(e).format("M"))}
                allowClear={false}
                onMouseEnter={(e) => setenteringCardExpiry(true)}
                onMouseLeave={(e) => setenteringCardExpiry(false)}
              />
              <DatePicker
                picker="year"
                onChange={(e) => setExpirationYear(moment(e).format("YY"))}
                allowClear={false}
                onMouseEnter={(e) => setFlip(false)}
                onMouseEnter={(e) => setenteringCardExpiry(true)}
                onMouseLeave={(e) => setenteringCardExpiry(false)}
              />
            </Form.Item>

            <Form.Item
              colon={false}
              label="CVV"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[0-9]*$/),
                  message: "CVV  should have only numbers !",
                },
              ]}
            >
              <Input
                onChange={(e) => setCvv(e.target.value)}
                onKeyPress={(e) => setFlip(true)}
                // onPointerDown={e=>setFlip(true)}
                onMouseEnter={(e) => setFlip(true)}
                onMouseLeave={(e) => setFlip(false)}
                maxLength={3}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
