import "./Gallery.css";
import i1 from "../assets/1.jpg";
import i2 from "../assets/2.jpg";
import i3 from "../assets/3.jpg";
import i4 from "../assets/4.jpg";
import i5 from "../assets/5.jpg";
import i6 from "../assets/6.jpg";
import i7 from "../assets/7.jpg";
import i8 from "../assets/8.jpg";
import i9 from "../assets/9.jpg";
import i10 from "../assets/10.jpg";
import i11 from "../assets/11.jpg";
import i12 from "../assets/12.jpg";


function Gallery() {

   const galleryData = [
      {
         id: 1,
         image: i1,
         title: "Tech Conference 2026",
         desc: "500+ students participated in our flagship tech event."
      },
      {
         id: 2,
         image: i2,
         title: "Coding Challenge",
         desc: "Competitive coding event with exciting prizes."
      },
      {
         id: 3,
         image: i3,
         title: "Hackathon",
         desc: "24-hour innovation and development challenge."
      },
      {
         id: 4,
         image: i4,
         title: "Workshop Series",
         desc: "Hands-on training sessions for students."
      },
      {
         id: 5,
         image: i5,
         title: "Team Building",
         desc: "Fun activities and networking opportunities."
      },
      {
         id: 6,
         image: i6,
         title: "AI Summit",
         desc: "Exploring the future of Artificial Intelligence."
      },
      {
         id: 7,
         image: i7,
         title: "Web Development Bootcamp",
         desc: "Full-stack development training sessions."
      },
      {
         id: 8,
         image: i8,
         title: "Placement Drive",
         desc: "Career opportunities with top companies."
      },
      {
         id: 9,
         image: i9,
         title: "Startup Expo",
         desc: "Young entrepreneurs presenting innovative ideas."
      },
      {
         id: 10,
         image: i10,
         title: "Cyber Security Awareness Camp",
         desc: "Students learned ethical hacking, cyber threats, data privacy, and modern security practices from industry experts."
      },
      {
         id: 11,
         image: i11,
         title: "National Project Exhibition",
         desc: "Innovative projects from various engineering disciplines were showcased and evaluated by professionals."
      },
      {
         id: 12,
         image: i12,
         title: "Industry Connect Meetup",
         desc: "Students interacted with industry leaders, alumni, and recruiters to gain career insights and networking opportunities."
      }
   ];

   return (
      <div className="gallery-page">

         <section className="gallery-hero">
            <h1>100+ Events Successfully Completed</h1>
            <p>
               Creating unforgettable experiences through technology,
               innovation, learning, and community engagement.
            </p>
         </section>

         <section className="gallery-grid">
            {galleryData.map((item) => (
               <div className="gallery-card" key={item.id}>
                  <img src={item.image} alt={item.title} />

                  <div className="gallery-overlay">
                     <h3>{item.title}</h3>
                     <p>{item.desc}</p>
                  </div>
               </div>
            ))}
         </section>

      </div>
   );
}

export default Gallery;