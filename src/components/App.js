import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { Suspense, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './util/route_util';
import NavBar from './nav_bar/nav-bar';
import Footer from './footer/footer'
import ModalContainer from './modal/modal';
import Welcome from './home/welcome'
import { createTheme, ThemeProvider, Container, Box } from '@mui/material';
import LoadingMessage from './util/loading/loading-screen';

const LeagueIndex = lazy(() => import('./home/league-index'));
const MatchIndexContainer = lazy(() => import('./matches/match-index-container'));
const ClubShowPage = lazy(() => import('./club/club-show-page'));
const LeagueShowPage = lazy(() => import('./league/league-show-page'));
const PlayerProfile = lazy(() => import('./player/player-profile'));
const MatchShowPage = lazy(() => import('./match/match-show-page'));
const Notifications = lazy(() => import('./home/home-notifications'));
const PostsTimeline = lazy(() => import('./home/posts-column'));
const NewsIndexContainer = lazy(() => import('./home/news-index-container'));
const PostShowPage = lazy(() => import('./post/post-show-page'));
const UserShowPage = lazy(() => import('./user/user-show-page'));
const UserUpdatePage = lazy(() => import('./user/user-update-page'));

function App() {
  const [lightMode, setLightMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: lightMode ? 'light' : 'dark',
      primary: {
        main: '#00a672',
        light: '#00c49a',
        dark: '#005a2c',
        darker: '#182C25',
      },
      secondary: {
        main: '#18ade5',
        light: '#84d6f0',
        dark: '#005c8f'
      },
      background: {
        standard: lightMode ? '#f5f5f5' : '#121212'
      }
    },
    typography: {
      fontFamily: 'Ubuntu',
      bold: 'Ubuntu-Bold',
      light: 'Ubuntu-Light',
      regular: 'Ubuntu-Regular'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.standard, color: theme.palette.text.primary, borderRadius: '0px', minHeight: '100vw' }} >
        <NavBar lightMode={lightMode} setLightMode={setLightMode} />
        <ModalContainer/>
        <Container sx={{paddingTop: '6rem'}} fixed >
          <Suspense fallback={<LoadingMessage/>}>
            <Routes>
              <Route path={'/'} element={<ProtectedRoute />} >
                <Route path={'/home'} element={<PostsTimeline/>} />
                <Route path='/notifications' element={<Notifications/>} />
                <Route path='/matches' element={<MatchIndexContainer/>} />
                <Route path='/explore' element={<LeagueIndex/>} />
                <Route path='/news' element={<NewsIndexContainer/>} />
                <Route path='/match/:id' element={<MatchShowPage/>} />
                <Route path='/user/:username' element={<UserShowPage/>}/>
                <Route path='/club/:id' element={<ClubShowPage/>} />
                <Route path='/league/:id' element={<LeagueShowPage/>} />
                <Route path='/player/:id' element={<PlayerProfile/>} />
                <Route path='/post/:id' element={<PostShowPage/>}/>
                <Route path='/edit-profile/:username' element={<UserUpdatePage/>}/>
              </Route>
              <Route exact path='/welcome' element={<Welcome />} />
            </Routes>
          </Suspense>
        </Container>
      </Box>
      <Footer lightMode={lightMode} />
    </ThemeProvider>
  )
}

export default App;