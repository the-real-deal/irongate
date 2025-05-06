import { Box, Button } from "@mui/joy"
import ThemeSwitcher from "./components/ThemeSwitcher"

function App() {

  return (
    <Box sx={{
      height: '100dvh',
      width: '100dvw',
    }}>
      <Button>Hello world</Button>
      <ThemeSwitcher></ThemeSwitcher>
    </Box>
  )
}

export default App
