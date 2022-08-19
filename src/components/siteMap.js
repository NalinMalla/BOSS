import { Link } from "@mui/material";

import Colors from "../res/colors";

export default function SiteMap(){
   return(
     <div style={Styles.root}>
       <div style={Styles.container}>
         <span style={Styles.header}>Get To Know Us</span>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Our Company</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Our Designs</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Our Projects</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Our Team</Link>
       </div>
       <div style={Styles.container}>
         <span style={Styles.header}>Our Services</span>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Custom Furniture</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Prefabricated Construction</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Interior Décor</Link>
       </div>
       <div style={Styles.container}>
         <span style={Styles.header}>Careers</span>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Join</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Internship</Link>
       </div>
       <div style={Styles.container}>
         <span style={Styles.header}>Customer Support</span>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Help Center</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>FAQ</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Feedback</Link>
       </div>
       <div style={Styles.container}>
         <span style={Styles.header}>Connect With Us</span>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Email</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Facebook</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>Whats App</Link>
         <Link href="#" underline="none" style={{color: "rgba(255,255,255,0.6)",}}>+977-01445555</Link>
       </div>
     </div>
   );
}

const Styles = {
  root: {
    display: "flex",
    flex: 1,
    width: '93%',
    paddingTop: 32,
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    alignItems: "flex-start"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    color: "rgba(255,255,255,0.6)",
    fontWeight: 5,
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 8
  }
}
