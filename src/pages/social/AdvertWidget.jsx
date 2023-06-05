import { Typography} from "@mui/material";
import FlexBetween from "../../components/widgets/FlexBetween";
import WidgetWrapper from "../../components/widgets/WidgetWrapper";

const AdvertWidget = () => {
//   const dark = palette.neutral.dark;
  const main = '#fff';
  const medium = '#fff';

  return (
    <WidgetWrapper>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:5000/assets/info4.gif"
        style={{ borderRadius: "0.75rem", margin: "1rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>CodeOn</Typography>
        <Typography color={medium}>By Himanshu Gupta</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to learn, innovate and help others.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
