

export const clientid = "vp_89IUVJd7CD_GueiD8hKiP";
export const clientSecret = "0trKB8Eswff9ijgqyez7CLpQV7Bry8DO";

export const defaultEndpoint =
    "https://api.us-central1.gcp.commercetools.com/onlinestore-poc/products/";
export const authEndpoint =
    "https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials";


export const authIntrospect = 'https://auth.us-central1.gcp.commercetools.com/oauth/introspect?token=';

export function generateHexString(length) {
    var ret = "";
    while (ret.length < length) {
        ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0, length);
}

export function convertToSlug(Text) {
    return Text
        .toString()
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        ;
}

function Welcome() {
    return <h1>Hello</h1>;
  }
  
  export default Welcome;
