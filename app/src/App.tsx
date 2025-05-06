import { Box, Button } from "@mui/joy"
import ThemeSwitcher from "./components/ThemeSwitcher"

function App() {

  return (
    <Box sx={{
      height: '100dvh',
      width: '100dvw',
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
      <Button variant="solid">Hello world</Button>
      <ThemeSwitcher></ThemeSwitcher>
    </Box>
  )
}

export default App
