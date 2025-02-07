import React, { useState, useEffect } from "react";
import { getCinemas } from "../../Services/Cinema";
import { getMovies } from "../../Services/Movie";
import { createTicket, getTickets } from "../../Services/Ticket";
import handleLogout from "../LogOutButton"; // Import log out functionality
import "./UCallCinema.css";

const UCallCinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]); // Lista filmova
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [loadingCinemas, setLoadingCinemas] = useState(true); // Loading stanje za kina
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [cinemaId, setSelectedCinemaId] = useState(""); //selected cinema (id)
  const [showLogout, setShowLogout] = useState(false); // Track toolbar menu
  const [cartCount, setCartCount] = useState(0); // Brojač za košaricu
  const [cartItems, setCartItems] = useState([]); // Pohranjivanje kupljenih karata
  const [showModal, setShowModal] = useState(false); // Modal prozor
  const [user, setUser] = useState(null); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tickets, setTickets] = useState([]);

  const handleSeatClick = (seat) => {
    // If the same seat is clicked again, deselect it
  if (selectedSeats.includes(seat)) {
    setSelectedSeats([]);
  } else {
    setSelectedSeats([seat]); // Only one seat can be selected at a time
  }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Fetch all cinemas
  const fetchCinemas = async () => {
    try {
      setLoadingCinemas(true);
      const data = await getCinemas();
      setCinemas(data);
    } catch (error) {
      alert("Failed to load cinemas.");
    } finally {
      setLoadingCinemas(false);
    }
  };

  // get movies 
  const fetchMovies = async () => {
    try {
      setLoadingMovies(true);
      const data = await getMovies(); // API call for fetching movies
      setMovies(data);
    } catch (error) {
      alert("Failed to load movies.");
    } finally {
      setLoadingMovies(false);
    }
  };

  //get tickets
  const fetchTickets = async () => {
    try {
      const data = await getTickets(); 
      setTickets(data);
      console.log("Occupied seats:");
      tickets.forEach(ticket => {
        console.log(ticket.seatNumber);
      });
    } catch (error) {
      alert("Failed to load tickets.");
    } 
  }

  // if selected cinema change, get movies for that cinema
  useEffect(() => {
    if (cinemaId) {
      const filtered = movies.filter((movie) => {
        return movie.cinemaId === cinemaId; 
      });
      setFilteredMovies(filtered);
      console.log("Filtered Movies:", filtered);
    } else {
      setFilteredMovies([]); // no selected cinema, empty movie list
    }
  }, [cinemaId, movies]);

  useEffect(() => {
    fetchCinemas(); 
    fetchMovies(); 
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    setCartCount(storedCartItems.length); 
  }, []);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);
  
  const handleSelection = (event) => {
    const selectedCinemaId = event.target.value;
    setSelectedCinemaId(selectedCinemaId);
    fetchTickets();
  };

  // opening model with data
  const handleAddTicket = (movie, cinema) => {
    const selectedSeat = selectedSeats[0];
    if(selectedSeat) {
    const newTicket = {
      cinemaName: cinema.name,
      cinemaLocation: cinema.location,
      cinemaId: cinema.cinemaId,
      hallId: movie.hallId,
      movieTitle: movie.title,
      movieId: movie.movieId,
      // seat: seatInput,
      seat: selectedSeat,
      userName: user.name,
      userId: user.id,
    };

    const updatedCartItems = [...cartItems, newTicket];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // saving in Local Storage
    setCartItems(updatedCartItems);
    setCartCount((cartCount) => cartCount + 1); 
    // Deselect the seat after adding the ticket
    setSelectedSeats([]);
    alert("Ticket added.");
    } else {
      alert("Select seat first.");
    }
  };  

  if (loadingCinemas || loadingMovies) {
    return <p>Loading cinemas...</p>;
  }
  
  const handleBuyTicket = async () => {
    try {
      const storedTickets = JSON.parse(localStorage.getItem("cartItems")) || [];
      for (const ticket of storedTickets) {
        const ticketData = {
          personId: ticket.userId,
          movieId: ticket.movieId,
          seatNumber: ticket.seat,
        };
        await createTicket(ticketData);
      }
      localStorage.removeItem("cartItems");
      alert("Successfully purchased!");
    } catch (error) {
      alert("Failed to purchase ticket.");
    } finally {
      setCartItems([]);
      setShowModal(false); // closing modal
    }
  };

  // function for displaying modal and data
  const handleOpenCart = () => {
    setShowModal((prev) => !prev);
  };

  const handleDeleteTicket = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    setCartCount(updatedCartItems.length); 
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

  return (
    <div>
      <div className="container">
      {/* Toolbar */}
        <div className="toolbar">
          <div className="left">
            <h1 className="title">Cinema</h1>
          </div>

          <div className="right">
            <div className="cart">
              <button className="cart-button" onClick={handleOpenCart}>
                &#128722; {/* Shopping cart icon */}
                <span className="cart-count">{cartCount}</span>
              </button>
            </div>

            <div className="menu">
              <button
                className="menu-bar"
                onClick={() => setShowLogout((prev) => !prev)}
              >
                &#9776; {/* Hamburger icon */}
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="logOut">
        {showLogout && (
          <div className="menu-dropdown">
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Modal for added tickets */}
      <div className="showTickets">
        {showModal && (
            <div className="modal-cart" 
              style={{
                height: storedCartItems.length === 0 ? "150px" : "250px"
              }}
            >

              <h3 className="cartTitle">Your Cart</h3>
              {storedCartItems && storedCartItems.length > 0 ? (
                storedCartItems.map((item, index) => (
                  <div className="cartContent" key={index}>
                    <p><span className="cinema-label">Cinema:</span> {item.cinemaLocation} - {item.cinemaName}</p>
                    <p><span className="movie-label">Movie:</span> {item.movieTitle}</p>
                    <p><span className="seat-label">Seat:</span> {item.seat}</p>
                    {/* <p><span className="hall-label">Hall:</span> {item.hallId}</p> */}
                    <p><span className="user-label">User:</span> {item.userName}</p>
                    <button className="deleteBtn" onClick={() => handleDeleteTicket(index)}>Delete</button>
                    <hr className="cartHr"/>
                  </div>
                ))
              ) : (
                <div className="noTicket">
                  <p>No tickets found.</p>
                </div>
              )}
              {storedCartItems && storedCartItems.length > 0 && (
                <button onClick={handleBuyTicket}>Buy</button>
              )}
              <div className="closeBtn">
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
        )}
      </div>

      {/* Dropdown */}
      <div className="dropdown">
        <select value={cinemaId} onChange={handleSelection}>
          <option value="" >
            -- Select a Cinema --
          </option>
          {cinemas.map((cinema) => (
            <option key={cinema.cinemaId} value={cinema.cinemaId}>
              {cinema.location} - {cinema.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show movie for selected cinema */}
      <div className="movies">
        {filteredMovies.length > 0 ? (
          <ul>
            {filteredMovies.map((movie) => (
              <li key={movie.movie_id}>
                <p id="movieTitle">{movie.title}</p>
                <p className="movieDescription">{movie.description}</p>
                <p className="movieDuration"><span className="duration-label">Duration:</span>  {movie.duration} minutes</p>
                <button
                  className="addTicket"
                  onClick={() =>
                    handleAddTicket(
                      movie,
                      cinemas.find((cinema) => cinema.cinemaId === cinemaId)
                    )
                  }
                >
                  Add ticket
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div> </div>
        )
        }
      </div>

      {/* Seat Map Section */}
      <div className="seats">
        <h2 className="seatMap">Seat Map</h2>
        <div className="screen">
          <span>Screen</span>
          <hr/>
        </div>
        <div className="seat-map">
          {["A", "B", "C", "D"].map((rowLabel) => (
            <div key={rowLabel} className="seat-row">
              <span className="row-label">{rowLabel}</span>
              {Array.from({ length: 8 }, (_, seatIndex) => {
                const seatId = `${rowLabel}${seatIndex + 1}`;
                return (
                  <div
                    key={seatId}
                    className={`seat ${
                      selectedSeats.includes(seatId) ? "selected" : ""
                    }`}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatId}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default UCallCinema;
