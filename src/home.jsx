import { RiTwitterXFill } from "react-icons/ri";
import "./home.scss";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { laws_data } from "./context/data";

const sampleTitles = [
  "Ban ads on government websites",
  "Make Fridays remote work days",
  "Public trash cans must have recycling bins",
  "Legalize rooftop farming incentives",
  "Create a national digital ID wallet",
  "Free vision checks for students",
  "Shorter workweeks for parents",
  "Tax cuts for zero-emission home upgrades",
  "Require emergency alerts in all languages",
  "Set green zones in every neighborhood",
];

const sampleCategories = [
  "TECHNOLOGY",
  "HEALTH",
  "ENVIRONMENT",
  "GOVERNANCE",
  "EDUCATION",
  "FAMILY",
  "HOUSING",
  "SAFETY",
  "CIVIL RIGHTS",
  "URBAN DESIGN",
];

export const App = () => {
  const [laws, setLaws] = useState(laws_data);
  const [modalOpen, setModalOpen] = useState(false);
  const [newLaw, setNewLaw] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleCreateLaw = () => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newItem = {
      id: Date.now(),
      title: newLaw.title,
      category: newLaw.category,
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      createdAt: formatted,
    };

    setLaws((prev) => [newItem, ...prev]);
    setNewLaw({ title: "", category: "", description: "" });
    setModalOpen(false);
  };

  // 🟢 Otomatik Rastgele Post Ekleyici
  useEffect(() => {
    const addRandomPost = () => {
      const now = new Date();
      const formatted = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      const randomTitle =
        sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
      const randomCategory =
        sampleCategories[Math.floor(Math.random() * sampleCategories.length)];

      const fakeLaw = {
        id: Date.now(),
        title: randomTitle,
        category: randomCategory,
        upvotes: Math.floor(Math.random() * 100),
        downvotes: Math.floor(Math.random() * 20),
        comments: Math.floor(Math.random() * 20),
        createdAt: formatted,
      };

      setLaws((prev) => [fakeLaw, ...prev]);
    };

    // ilk otomatik postu 60-180 saniye içinde random oluştur
    const getRandomDelay = () => Math.floor(Math.random() * 12000) + 6000;

    const loop = () => {
      const timeout = setTimeout(() => {
        addRandomPost();
        loop(); // kendini tekrar çağır
      }, getRandomDelay());

      return () => clearTimeout(timeout);
    };

    const cancel = loop();
    return cancel;
  }, []);

  return (
    <div className="df fdc parliament">
      <div className="w100 df jcsb main-header">
        <p className="fs-28">THE PEOPLE'S PARLIAMENT</p>
        <u className="df aic gap-10 fs-18 cp">
          Follow Us <RiTwitterXFill className="fs-22" />
        </u>
      </div>

      <div className="w100 df aic jcsb header">
        <button className="df aic gap-15" onClick={() => setModalOpen(true)}>
          <FaPlus /> NEW LAW
        </button>
        <div className="df aic filters">
          {["Trending", "Popular", "Recent"].map((filter) => (
            <button key={filter}>{filter}</button>
          ))}
        </div>
      </div>

      <div className="laws">
        {laws.map((law) => (
          <div className="df fdc law" key={law.id}>
            <div className="info">
              <h3>{law.title}</h3>
              <span className="cat">{law.category}</span>
              <span className="com">{law.comments} comments</span>
              <span className="date">posted: {law.createdAt}</span>
            </div>
            <div className="w100 df aic jcsb votes">
              <div className="df aic gap-5 up">
                {law.upvotes}{" "}
                {law.upvotes > law.downvotes ? (
                  <IoIosArrowRoundUp className="fs-20" />
                ) : (
                  <IoIosArrowRoundDown className="fs-20" />
                )}
              </div>
              <div className="df aic gap-5 down">
                {law.downvotes < law.upvotes ? (
                  <IoIosArrowRoundDown className="fs-20" />
                ) : (
                  <IoIosArrowRoundUp className="fs-20" />
                )}
                {law.downvotes}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w100 df fdc aic jcc gap-10 footer">
        <p>2025 © The People's Parliament. All rights reserved.</p>
        <small>about | contact | privacy policy | terms of service</small>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Propose a New Law</h2>
            <input
              type="text"
              placeholder="Law Title"
              value={newLaw.title}
              onChange={(e) => setNewLaw({ ...newLaw, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newLaw.category}
              onChange={(e) =>
                setNewLaw({ ...newLaw, category: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newLaw.description}
              onChange={(e) =>
                setNewLaw({ ...newLaw, description: e.target.value })
              }
            />
            <div className="df jcsb">
              <button onClick={handleCreateLaw}>Submit</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
