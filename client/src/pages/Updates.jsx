import { Navbar } from "../components/Navbar";
import "../css/Updates.css";
import { Footer } from "../components/Footer";

export const Updates = () => {
    return (
        <>
            <Navbar />
            <h1>Today Updates</h1>
            <div>
                <div className="detail">
                    <ul>
                        <li>taja price</li>
                        <li>una rout is late</li>
                        <li>dlakj</li>
                    </ul>
                </div>
                <div className="bd14">
                    <img src="./images/taja.jpg" alt="Product" />
                </div>
                <div className="article">
                    <h1 style={{ textAlign: 'center' }}>Upcoming product</h1>
                    <table style={{ width: '100%', height: '200px' }}>
                        <tbody>
                            <tr>
                                <td colSpan="2">Product Name: Maavdi A2 Ghee</td>
                            </tr>
                            <tr>
                                <td>Quantity: 500gm./1lt.</td>
                                <td>Shelf life: 6 Month</td>
                            </tr>
                            <tr>
                                <td>Packing: Glass gar and 2</td>
                                <td>MRP: 999 rs.</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <ul>
                                        <li>PURE A2 GOODNESS: Maavdi A2 Cow Ghee is exclusively crafted from the A2 beta-casein-rich milk of Maavdi Desi Cows, ensuring easy digestion and a healthier dairy option.</li>
                                        <li>NUTRIENT-RICH TREASURE: Packed with essential vitamins, minerals, and antioxidants, our ghee promotes overall well-being, making it a valuable addition to your diet.</li>
                                        <li>TRADITIONAL CRAFTSMANSHIP: Handcrafted with love and dedication, our ghee embodies the authenticity and purity of centuries-old traditions. Experience the Maavdi difference today.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}