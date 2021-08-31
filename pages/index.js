
import React, { useEffect, useState } from "react";
import { Body } from "./index.style";
import { authIntrospect, defaultEndpoint, authEndpoint, generateHexString, convertToSlug, clientid, clientSecret } from "./property.js";




const ProductPayload = {
    "publish": true,
    "baseId": "",
    "productType": {
        "id": "4a2bbfbb-66d4-4845-9b3a-56f692ffcb01",
        // "id": "6d0fa435-2533-4be4-aa01-4625dce9fbd5",
        "typeId": "product-type"

    },
    "categories": [{
        "typeId": "category",
        // "id": "c67897a2-047d-4101-9f07-7eb7fdedb514"
        "id": "885c1b12-ebfe-4d40-b8df-70d31d91cf10"
    }],
    "name": {
        "en": "Some Product"
    },
    "description": {

        "en": "Dummy Description"

    },

    "slug": {
        "en": "product_slug_random-uuid"
    },

    "masterVariant": {
        "sku": "SKU-1",
        "prices": [{
            "value": {
                "currencyCode": "EUR",
                "centAmount": 4200
            }
        }],

        // "attributes": [{ "name": "baseId", "value": "adasdasd" }, { "name": "color", "value": "black" }, { "name": "size", "value": "xss" }, { "name": "style", "value": "sporty" }, { "name": "articleNumberManufacturer", "value": "CROCKABC123" }, { "name": "matrixId", "value": "MACKS122" }, { "name": "articleNumberMax", "value": "ABCSHOE123" }, { "name": "commonSize", "value": "xss" }, {
            "attributes": [{ "name": "color", "value": "black" }, { "name": "size", "value": "xss" }],
        "images": [{
            "url": "http://my.custom.cdn.net/master.png",
            "label": "Master Image",
            "dimensions": {
                "w": 303,
                "h": 197
            }
        }]
    },
    "variants": [{
        "attributes": [{ "name": "color", "value": "black" }, { "name": "size", "value": 7 }],
        "images": [{
            "url": "http://my.custom.cdn.net/variant.png",
            "label": "Variant Image",
            "dimensions": {
                "w": 303,
                "h": 197
            }
        }]

    }],
    "taxCategory": {
        "typeId": "tax-category",
        "id": "f79f870d-0967-4380-8f68-bff00660dd21"
      }
}


export async function getServerSideProps() {



    let valVal = generateHexString(14);;



    ProductPayload.masterVariant.images[0].url = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
    ProductPayload.variants[0].images[0].url = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";

    const data = " ";
    return {
        props: {
            data,

            revalidate: 1
        }
    }
}

function Calci({ data }) {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [disp, setDisp] = useState('');
    const [displaymessage, setDisplaymessage] = useState('')
    const [newdisplay, setNewdisplay] = useState('');
    const [sucess, setSucess] = useState('');
    const [url, setUrl] = useState('');
    const [size, setSize] = useState('');
    const [style, setStyle] = useState('');

    const [manufacturer, setManufacturer] = useState('');
    const [matrix, setMatrix] = useState('');
    const [maxmilan, setMaxmilan] = useState('');
    const [filtersize, setFiltersize] = useState('');
    const [colordescription, setColordescription] = useState('');
    const [sapid, setSapid] = useState('');
    const [date, setDate] = useState('');
    const [base, setBase] = useState('');


    const [detail, setDetail] = useState('');


    useEffect(() => {
        if (newdisplay) {
            if (newdisplay.statusCode == 400) {
                setSucess("")
            }
            else {
                console.log("Sucess");
                setSucess(<p>{newdisplay.masterData.current.name.en} is added succesfully</p>)
            }
        }

    }, [displaymessage, disp, newdisplay])


    async function handleSubmit() {

        const auth_res = await fetch(authEndpoint, {
            method: 'POST',
            headers: {

                'Accept': '*/*',

                'Content-Type': 'application/x-www-form-urlencoded',

                'Authorization': 'Basic ' + Buffer.from(clientid + ":" + clientSecret).toString('base64')
            },
        });

        console.log("executing res auth");

        let res_auth = await auth_res.json();


        const clientToken = res_auth.access_token;
        ProductPayload.name.en = name;
        ProductPayload.masterVariant.images[0].url = url;
        // ProductPayload.masterVariant.attributes[0].value = base;
        ProductPayload.masterVariant.attributes[0].value = color;
        ProductPayload.masterVariant.attributes[1].value = parseInt(size);
        // ProductPayload.masterVariant.attributes[3].value = style;

        // ProductPayload.masterVariant.attributes[4].value = manufacturer;
        // ProductPayload.masterVariant.attributes[5].value = matrix;
        // ProductPayload.masterVariant.attributes[6].value = maxmilan;
        // ProductPayload.masterVariant.attributes[7].value = filtersize;
        // ProductPayload.masterVariant.attributes[8].value.en = colordescription;
        // ProductPayload.masterVariant.attributes[9].value.en = detail;
        // ProductPayload.masterVariant.attributes[10].value = sapid;
        // ProductPayload.masterVariant.attributes[11].value = date;
        ProductPayload.description.en = details;
        ProductPayload.masterVariant.prices[0].value.centAmount = parseInt(price);
        ProductPayload.slug.en = convertToSlug(name);
        ProductPayload.masterVariant.sku = matrix;
        console.log("payload", JSON.stringify(ProductPayload));
        const res = await fetch(defaultEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + clientToken

            },
            body: JSON.stringify(ProductPayload),

        });

        const data = await res.json();
        console.log("data1", data.message);
        console.log("data", data);

        if (data) {
            setDisp(true)
            setDisplaymessage(data.message)
            setNewdisplay(data)
        }

        return {
            props: {
                data,

                revalidate: 1
            }
        }

    }


    return (
        <Body style={{
            background: "rgb(34,193,195)",
            background: "linear-gradient(135deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            fontfamily: "work sans"
        }}>
            <div>

                <div style={{
                    backgroundColor: "lightblue",
                    marginRight: "6%",
                    marginLeft: "40%",
                    marginTop: "4%",
                    marginBottom: "10%",
                    borderRadius: "25px",
                    display: "inline-block",
                    paddingRight: "85px",
                    paddingLeft: "49px",
                    paddinTop: "25px",
                    paddingBottom: "45px",
                    overflowY: "visible"

                }}
                >

                    <h1>Product Form</h1><br />

                    <div >
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Name
                            </span>
                            
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Enter the product name'></input>
                        </label>
                        <br></br>

                        <br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Product Description
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={details} onChange={e => setDetails(e.target.value)} placeholder='Enter the product description'></input>
                        </label>
                        <br></br>

                        <br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Price
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={price} onChange={e => setPrice(e.target.value)} placeholder='Displays the price'></input>
                        </label>
                        <br />

                        <br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Image URL
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={url} onChange={e => setUrl(e.target.value)} placeholder='Enter image url'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Color
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={color} onChange={e => setColor(e.target.value)} placeholder='Enter color'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Size (Integer Number)
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={size} onChange={e => setSize(e.target.value)} placeholder='Enter Size'></input>
                        </label>
                        <br /><br />
                        {/* <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={style} onChange={e => setStyle(e.target.value)} placeholder='Enter Style'></input> */}
                        {/* <br /><br /> */}
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Manufacturer ID
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={manufacturer} onChange={e => setManufacturer(e.target.value)} placeholder='Enter manufacturerId'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Matrix ID
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={matrix} onChange={e => setMatrix(e.target.value)} placeholder='Enter MatrixId'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                AID Maxmilan
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={maxmilan} onChange={e => setMaxmilan(e.target.value)} placeholder='Enter Aid Maxmilan'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Filter Size
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={filtersize} onChange={e => setFiltersize(e.target.value)} placeholder='Enter Filtersize'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Color Description
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={colordescription} onChange={e => setColordescription(e.target.value)} placeholder='Enter colordescription'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Product Details
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={detail} onChange={e => setDetail(e.target.value)} placeholder='Enter Details'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Sap External ID
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={sapid} onChange={e => setSapid(e.target.value)} placeholder='Enter SapExternalId'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Date
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='date' value={date} onChange={e => setDate(e.target.value)} placeholder='Enter Date'></input>
                        </label>
                        <br /><br />
                        <label>
                            <span style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", fontWeight: 'bold' }}>
                                Base ID
                            </span>
                        <input style={{ width: "130%", height: "40px", padding: "0.3rem", marginLeft: "-1.5rem", borderRadius: "8px" }} type='text' value={base} onChange={e => setBase(e.target.value)} placeholder='Enter BaseId'></input>
                        </label>
                        <br /><br />

                        <button style={{cursor:'pointer', fontWeight:'bold', fontsize: "1em", height: "40PX", marginLeft: "-1.5rem", padding: "0.3rem", border: "2px solid black", borderradius: "8px", color: "black", alignItems: "center" }} onClick={handleSubmit.bind()} >SUBMIT</button><br></br>

                    </div>
                    {displaymessage}
                    {sucess}
                </div>

            </div>
        </Body>

    );
};

export default Calci;