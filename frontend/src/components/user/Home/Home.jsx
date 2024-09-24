import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const hostelData = {
  title: "PG Hostel For Men and Women",
  description: "The PG Hostel for men was established in 2002 at the Taramani campus with a minimum strength of 75 students. Now, it accommodates 587 postgraduate students and Ph.D. scholars from various disciplines like Arts, Science, Linguistics, and Humanities. The women's hostel was established in 2007 and expanded in 2016 and 2019 to accommodate 400 students.",
  sections: [
    {
      title: "Men's Hostel",
      established: "2002",
      capacity: 587,
      buildings: ["PG Block", "Research Scholar Block"],
      facilities: [
        "Library (includes a Digital Library and a Visually Impaired Library with Braille Books)",
        "Gym",
        "Smart Laundry Room (with Washing Machine)",
        "Playgrounds (Cricket, Shuttle, Football, Volleyball, Kabaddi)",
        "TV Hall",
        "Indoor Games Room (Chess, Carom Board)",
        "Parking",
        "24x7 Electricity",
        "RO Drinking Water",
        "Wi-Fi"
      ]
    },
    {
      title: "Women's Hostel",
      established: "2007",
      capacity: 400,
      buildings: ["T1 Block", "T2 Block (added in 2016)", "T3 Block (added in 2019)"],
      facilities: [
        "Library (includes a Digital Library and a Visually Impaired Library with Braille Books)",
        "Gym",
        "Smart Laundry Room (with Washing Machine)",
        "Playgrounds (Cricket, Shuttle, Football, Volleyball, Kabaddi)",
        "TV Hall",
        "Indoor Games Room (Chess, Carom Board)",
        "Parking",
        "24x7 Electricity",
        "RO Drinking Water",
        "Wi-Fi"
      ]
    },
    {
      title: "Hostel Events",
      events: [
        "Monthly Special Dinner with DJ and Cultural Events",
        "Fresher’s Day",
        "Farewell Day",
        "Hostel Day (Dream Land)",
        "Pongal Celebration"
      ]
    },
    {
      title: "Hostel Management",
      description: "The hostel is managed by wardens, deputy wardens, managers, and the student council. The administration oversees the hostel, kitchen, and mess operations. There are 25 workers managing the hostel.",
      committees: [
        { name: "Student Council", role: "Manages hostel administration" },
        { name: "Library Committee", role: "Handles library management" },
        { name: "Literary Committee", role: "Organizes study circles and literary competitions" },
        { name: "Tech Committee", role: "Oversees technical works in the hostel" }
      ]
    },
    {
      title: "Hostel Mess",
      description: "The hostel mess is managed by student secretaries and managers under the supervision of wardens. The mess offers a variety of meals and is operated efficiently with regular feedback from students."
    },
    {
      title: "Hostel Day (Dream Land)",
      description: "The hostel day celebrations are combined for both the men's and women's hostels. The first Hostel Day was celebrated in 2004. It is an annual event where students enjoy cultural activities and special dinners.",
      events: [
        "Old age home visitors and children’s home students visit the hostel",
        "Donations are made to orphanages and homes",
        "Cultural events and performances by visitors",
        "Chief guest speeches",
        "Prize distribution for sports and literary competitions"
      ]
    }
  ],
  contact: {
    phone_numbers: ["9655407709", "9345212678", "8667503794"],
    email: "Dreamlandunom@gmail.com"
  }
};

const Home = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible'); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="scroll-snap-y">
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">{hostelData.title}</h1>
      <motion.div
          className="snap-center h-auto flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white fade-in"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} 
        >
          <p className="text-lg mb-6">{hostelData.description}</p>
        </motion.div>

        {hostelData.sections.map((section, index) => (
          <motion.div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="snap-center h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white fade-in"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }} 
          >
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-2">{section.title}</h2>
              {section.description && <p>{section.description}</p>}
              {section.established && <p>Established: {section.established}</p>}
              {section.capacity && <p>Capacity: {section.capacity}</p>}
              {section.buildings && section.buildings.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mt-4">Buildings:</h3>
                  <ul className="list-disc list-inside">
                    {section.buildings.map((building, idx) => (
                      <li key={idx}>{building}</li>
                    ))}
                  </ul>
                </>
              )}
              {section.facilities && section.facilities.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mt-4">Facilities:</h3>
                  <ul className="list-disc list-inside">
                    {section.facilities.map((facility, idx) => (
                      <li key={idx}>{facility}</li>
                    ))}
                  </ul>
                </>
              )}
              {section.events && section.events.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mt-4">Events:</h3>
                  <ul className="list-disc list-inside">
                    {section.events.map((event, idx) => (
                      <li key={idx}>{event}</li>
                    ))}
                  </ul>
                </>
              )}
              {section.committees && section.committees.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mt-4">Committees:</h3>
                  <ul className="list-disc list-inside">
                    {section.committees.map((committee, idx) => (
                      <li key={idx}>
                        <strong>{committee.name}</strong>: {committee.role}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        ))}

        <footer className="mt-12">
          <p className="text-center text-gray-500">Contact us:</p>
          <p className="text-center">
            Phone Numbers: {hostelData.contact.phone_numbers.join(', ')} | Email: {hostelData.contact.email}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
