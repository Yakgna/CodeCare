import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import {createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Homepage/Header.tsx';
import MainFeaturedPost from '../components/Homepage/MainFeaturedPost.tsx';
import FeaturedPost from '../components/Homepage/FeaturedPost.tsx';
import Footer from '../components/Homepage/Footer.tsx';





const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
"    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus reprehenderit ut harum. Omnis, quae odit. Eveniet sed facere nesciunt a sit eligendi ducimus repudiandae aliquid, officia corporis, optio ratione deserunt.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Add Feature post1',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    delay:500
  },
  {
    title: 'Add Feature post2',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    delay:500
  },
  {
    title: 'Add Feature post3',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    delay:500
  },
  {
    title: 'Add Feature post4',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    delay:500
  }
];



const defaultTheme =  createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function HomePage() {
  return (
    <>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '0%', padding:'0%'}}>

          <h1>Featured Posts</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position:'relative',left:'100px'}}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <Grid container spacing={4} justifyContent="center">
                {featuredPosts.map((post) => (
                  <Grid item xs={12} sm={6} md={6} key={post.title}>
                    <FeaturedPost post={post} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '50px' }}>
          <Footer
            title="Footer"
            description="Something here to give the footer a purpose!"
          />
        </div>
      </main>
    </>
  );
}
