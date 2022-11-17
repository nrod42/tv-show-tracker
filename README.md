# TV Show/Movie Tracker

Find your TV shows and movies and add them to watch lists for easy tracking.

[Live Site](https://nrod42.github.io/tv-show-tracker/)

## Functionality

- Browse TV shows and movies, view show/movie details, and see recommended and similar selections.
- Shows/movies are shown by categories like Top Rated or Popular but users can search for a specific show/movie.
- Users can add any TV show or movie to multiple watch lists for easy tracking.
- All lists are saved using local storage.
- All TV show and movie data is fetched using The Movie Database API.

## Reflection

I wanted to make a project that I thought was interesting but would also make use of everything that I had learned until this point. Besides getting really comfortable with props and state, I learned a lot more about some other hooks like useEffect and useContext. I was also able to use React Router for the first time which was very helpful.

#### useEffect

Although I had used it once in my previous project, I ended up using useEffect many times, mostly to fetch data from API's. I quickly learned about the dependency array and the dangers of not including one. At one point, the page kept crashing constantly but after some research I realized it was because I wasn't including the dependency arrays. This meant that if shows/movies on a page needed to be rendered, useEffect would make an API call to get the shows/movies data and update some states...which would cause a re-render... which would call the API again causing an infinite loop.

#### useContext

This project also taught me about the useContext hook. Each show/movie had a "Add To Watchlist" button which meant that each component and most of their children needed access to the different watch list states. At first, I thought I would need to keep passing these watch lists states as props to each component and then to each subsequent child component. This seemed like it would get messy very quickly so I figured there was a way around this. After some quick research, I learned about the useContext hook which was sort of like a global variable in that it would let me set the state of the different watch lists in a parent component and then all descendants would have access to these states without the need to keep passing them down as props.

#### React Router

This project was my first time implementing react router where I learned how to create and organize different pages. I also ended up dynamically creating paths for each show/movie by adding the show/movie ID to the end of the path of the page which displayed shows/movies.

#### Other

On a lesser note, because there were many different API calls in this project, I learned to bundled them all together into a module for better organization and cleaner code.

## Screenshot

![Screenshot of the homepage](/src/img/homepage_screenshot.png)
