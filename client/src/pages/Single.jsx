import React, { useEffect, useState } from "react";
import Delete from "../img/delete.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import "moment/locale/es";
moment.locale("es");

const Single = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        {post && post.img && <img src={`../upload/${post.img}`} alt="" />}
        <div className="user">
          {post && post.userImg && <img src={post.userImg} alt="" />}
          {post && post.username && (
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.fecha).fromNow()}</p>
            </div>
          )}
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        {post && (
          <>
            <h1>{post.title}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>
          </>
        )}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
