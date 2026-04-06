
const ContactUs=()=>{

  return(
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
    
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="space-y-4">
        <p>
          <span className="font-semibold">Company:</span> Food Hub Pvt. Ltd.
        </p>
        <p>
          <span className="font-semibold">Address:</span> 123 Flavor Street,
          Kapra, Hyderabad, Telangana – 500083
        </p>
        <p>
          <span className="font-semibold">Phone:</span> +91 98765 43210
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          <a href="mailto:support@foodhub.com" className="text-red-600 underline">
            support@foodhub.com
          </a>
        </p>
        <p>
          <span className="font-semibold">Working Hours:</span> Mon–Sat: 10:00 AM – 10:00 PM, Sun: 11:00 AM – 8:00 PM
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
        <ul className="space-y-2">
          <li>
            <a href="https://facebook.com/foodhub" className="text-blue-600 underline">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://instagram.com/foodhub" className="text-pink-600 underline">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://twitter.com/foodhub" className="text-blue-400 underline">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContactUs;