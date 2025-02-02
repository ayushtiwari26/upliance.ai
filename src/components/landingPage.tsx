import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import Doctors from "../assets/drss.png";

export const LandingPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#77B254",
        // backgroundImage: `url(${LandingPageImage})`, // Use the image as the background
        backgroundSize: "cover", // Ensure the background covers the entire page
        backgroundPosition: "center", // Center the background image
      }}
    >
      {/* Semi-transparent overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust opacity here
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Left Side: Text Content */}
          <Box sx={{ maxWidth: "50%" }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.dark, // Darker color for better contrast
              }}
            >
              Your Journey to Natural Healing Starts Here
            </Typography>
            <Typography
              variant="h5"
              component="p"
              gutterBottom
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
              }}
            >
              Experience the Power of Homeopathy for Holistic Wellness and
              Personalized Care.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: "1.1rem",
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Book Appointment
            </Button>
          </Box>

          {/* Right Side: Image */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              //   boxShadow: 6,
              flex: 1,
              maxWidth: "50%",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="Doctors image"
              src={Doctors}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
