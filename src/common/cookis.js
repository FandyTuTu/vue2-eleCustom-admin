import Cookies from "js-cookie";
// Create a cookie, valid across the entire site:
Cookies.set("name", "value");

// Create a cookie that expires 7 days from now, valid across the entire site:
Cookies.set("name", "value", { expires: 7 });

// Create an expiring cookie, valid to the path of the current page:
Cookies.set("name", "value", { expires: 7, path: "" });

// Read cookie:
Cookies.get("name"); // => 'value'
Cookies.get("nothing"); // => undefined

// Read all visible cookies:
Cookies.get(); // => { name: 'value' }
// Read cookie:
Cookies.get("name"); // => 'value'
Cookies.get("nothing"); // => undefined

// Read all visible cookies:
Cookies.get(); // => { name: 'value' }

// Delete cookie:
Cookies.remove("name");

// Delete a cookie valid to the path of the current page:
Cookies.set("name", "value", { path: "" });
Cookies.remove("name"); // fail!
Cookies.remove("name", { path: "" }); // removed!

export default Cookies;
