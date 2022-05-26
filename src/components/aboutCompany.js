import Button from '@mui/material/Button';

import Colors from "../res/colors";
import Images from "../res/images";

export default function AboutCompany(){
  return(
    <div style={Styles.root}>
      <div style={Styles.leftContainer}>
        <span style={{fontSize: 18, }}>More About</span>
        <span style={{fontSize: 30, fontWeight: 500}}>The Company</span>
        <p style={{textAlign: "justify", marginTop: 30}}>
          We at BIRA Builders and Suppliers PVT. LTD. have always prioritized making excellent and elegant products in the five decades that we have been in business. 
          <br/>
          {'\u00A0\u00A0\u00A0\u00A0'} Besides producing furniture, door/window frames, trusses, parquets, wall paneling and all kinds of wooden products, we also construct light weight pre-fabricated houses and do overall interior décor.
        </p>
        <Button variant="outlined" href="aboutUs" color= 'tertiary' style={{fontSize: 16, marginTop: 35, fontWeight: 500, borderWidth: 2}}>
          LEARN MORE
        </Button>
      </div>
      <img src={Images.RoomARWhite} alt="AR Marketing" style={Styles.rightContainer}></img>
    </div>
  );
}

const Styles = {
  root: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    marginTop: 60,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 40,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: 16,
    color: "rgba(255,255,255, 0.9)",
  },
  rightContainer: {
    height: "72vh",
  },
};