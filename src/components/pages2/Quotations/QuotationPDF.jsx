import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const QuotationPDF = () => {
  const [account, setAccount] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { noCoti } = useParams();

  const getQuotation = () => {
    axios
      .get(`http://localhost:3001/api/v1/quotations/${noCoti}`)
      .then((res) => setAccount(res.data.busqueda))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuotation();
  }, []);

  return (
    <div className="bg-white">
      <button onClick={handlePrint}>Print this out!</button>
      {account.length > 0 ? (
        <div ref={componentRef}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ color: "#C0AB4E", marginTop: "50px", marginLeft: "30px" }}>Service Quotation</h1>
            <img src="\images\lbc.png" alt="" style={{ height: "70px", marginRight: "50px", marginTop: "50px" }} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "80px",
              marginBottom: "80px",
            }}
          >
            <section style={{ color: "#711515" }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>To:</td>
                    <td>{account[0].accountId[0].accountName}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>{account[0].accountId[0].contact[0].contactName}</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>{account[0].accountId[0].address}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      {account[0].accountId[0].city}, {account[0].accountId[0].country}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>{account[0].accountId[0].contact[0].mobile1}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <table style={{ color: "#711515" }}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>Date:</td>
                    <td>{account[0].date}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>Quotation id:</td>
                    <td>{account[0].id}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>Expiration Date:</td>
                    <td>{account[0].expirationDate}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          <section>
            <table style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
              <thead style={{ backgroundColor: "#711515", color: "white" }}>
                <tr>
                  <th>Service Type</th>
                  <th>Service</th>
                  <th>Description</th>
                  <th>Unit Price USD</th>
                  <th>Discount (%)</th>
                  <th>Line Total USD</th>
                </tr>
              </thead>
              <tbody>
                {account[0].productos.map((item, index) => (
                  <tr className="text-center">
                    <td></td>
                    <td>{item.service}</td>
                    <td></td>
                    <td>{item.unitPrice}</td>
                    <td>{item.discount}</td>
                    <td>{item.lineTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <table style={{ display: "flex", justifyContent: "flex-end", marginRight: "10%", marginTop: "80px", marginBottom: "80px" }}>
              <tbody>
                <tr>
                  <td style={{ color: "#711515", minWidth: "100px", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>SubTotal</td>
                  <td style={{ minWidth: "100px" }}>{account[0].subTotal}</td>
                </tr>
                <tr>
                  <td style={{ color: "#711515", minWidth: "100px", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>Sales Tax</td>
                  <td>{account[0].tax}</td>
                </tr>
                <tr>
                  <td style={{ color: "#711515", minWidth: "100px", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>Total</td>
                  <td>{account[0].total}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "80px",
              marginBottom: "200px",
            }}
          >
            <section>
              <div className="row">
                <div className="col">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ color: "#711515", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>CUSTOMER NAME</td>
                        <td>JULIANA CABREJO</td>
                      </tr>
                      <tr>
                        <td style={{ color: "#711515", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>SWIFT/BIX</td>
                        <td>MEBLAEAD</td>
                      </tr>
                      <tr>
                        <td style={{ color: "#711515", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>BANK</td>
                        <td>EMIRATES ISLAMIC</td>
                      </tr>
                      <tr>
                        <td style={{ color: "#711515", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>ACCOUNT TYPE</td>
                        <td>CURRENT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ color: "#711515", fontWeight: "700", textAlign: "right", paddingRight: "10px" }}>IBAN:</td>
                        <td>AE210340003708442127101 </td>
                      </tr>
                      <tr>
                        <td style={{ color: "#711515", fontWeight: "700", textAlign: "right", paddingRight: "10px", minWidth: "200px" }}>
                          ACCOUNT NUMBER:
                        </td>
                        <td>3708442127101 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          <hr style={{ border: "1px solid #711515", width: "80%", marginLeft: "auto", marginRight: "auto" }} />

          <section>
            <div style={{ color: "#711515", textAlign: "center", margin: "0 px" }}>
              <p style={{ margin: "0px" }}>Thank you for your trust!</p>
              <p>Mobile: +57 502 019016, E-mail: info@latinoamericabusinesscenter.ae</p>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default QuotationPDF;
