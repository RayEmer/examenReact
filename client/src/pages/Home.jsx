import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { useConnection } from "../context/ConnectionContext";
import alasql from "alasql";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const cat = useLocation().search;
  const { isOnline } = useConnection();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (isOnline) {
        console.log("Estás online. Cargando posts desde la API...");
        try {
          const res = await axios.get(`/posts${cat}`);
          setPosts(res.data);
          const cat2 = cat.split("=")[1];
          console.log("cat2", cat2);
          if (cat2 === undefined) {
            console.log("Se guardaron los datos de forma local...");
            localStorage.setItem("posts", JSON.stringify(res.data));
          }
        } catch (err) {
          // console.log(err);
        }
      } else {
        console.log(
          "Estás offline. Cargando posts desde el almacenamiento local..."
        );
        const savedPosts = localStorage.getItem("posts");
        if (savedPosts) {
          const cat2 = cat.split("=")[1];
          const filteredPosts = alasql(`SELECT * FROM ? WHERE cat = ?`, [
            JSON.parse(savedPosts),
            cat2,
          ]);
          setPosts(filteredPosts);
        }
      }
    };
    fetchData();
  }, [cat]);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(query) ||
      post.descripcion.toLowerCase().includes(query) ||
      (post.username && post.username.toLowerCase().includes(query))
    );
  });

  return (
    <div className="home">
      {!isOnline && (
        <div className="offline-indicator">
          Estás viendo posts descargados previamente porque actualmente estás
          offline.
        </div>
      )}
      <br></br>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por título, contenido, o autor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="posts">
        {filteredPosts.map((post) => (
          <div
            className="post"
            key={post.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "-80px",
              padding: "50px",
            }}
          >
            <div className="img">
              <img src={`../upload/${post.imagen}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.titulo}</h1>
                <h4>Por: {post.username}</h4>
              </Link>
              <br></br>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.descripcion.substring(0, 70) + "...",
                }}
              />
              <button onClick={() => openModal(post)}>Leer más</button>
            </div>
            <Modal
              isOpen={modalOpen && selectedPost && selectedPost.id === post.id}
              onRequestClose={closeModal}
              contentLabel="Post Modal"
              className="modal-container"
              overlayClassName="overlay"
            >
              {selectedPost && (
                <>
                  <button onClick={closeModal} className="close-button">
                    ✖
                  </button>
                  <div className="content-wrapper">
                    <div className="text-container">
                      <h2>{selectedPost.titulo}</h2>
                      <h4>{selectedPost.username}</h4>
                      <br></br>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedPost.descripcion,
                        }}
                        style={{ maxWidth: "100%", wordWrap: "break-word" }}
                      />
                    </div>
                    <div className="image-container">
                      <img
                        src={`../upload/${selectedPost.imagen}`}
                        alt=""
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  </div>
                </>
              )}
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
